import React, { useEffect, useState } from 'react'
import { Table, Button } from 'reactstrap'
import { ACTIVITIES_ENDPOINT } from '../../config'
import { dataProvider } from '../../dataProvider/dataProvider'
import { useToasts } from 'react-toast-notifications'
import ActivitiesItem from '../ActivitiesItem/ActivitiesItem'

const ActivitiesTable = () => {
    const [activities, setActivities] = useState()
    const [selectedActivities, setSelectedActivities] = useState({})
    const { addToast } = useToasts()
    const loadActivitiesFromDB = async () => {
        const request = {
            method: 'GET',
            url: ACTIVITIES_ENDPOINT,
        }
        const dbActivities = await dataProvider(request)
        setActivities(dbActivities)
    }
    const handlePerformActivities = (e) => {
        const requests = []
        let sendSyncDB = true
        Object.entries(selectedActivities).forEach((selectedActivity) => {
            const activityToUpdate = activities.find(
                (activity) => activity.id === Number(selectedActivity[0])
            )
            if (selectedActivity[1] && activityToUpdate.covidFriendly) {
                requests.push({
                    method: 'PUT',
                    url: `${ACTIVITIES_ENDPOINT}/${selectedActivity[0]}`,
                    data: {
                        ...activityToUpdate,
                        timesPerformed: activityToUpdate.timesPerformed + 1,
                    },
                })
            } else if (selectedActivity[1] && !activityToUpdate.covidFriendly) {
                addToast(
                    `Sorry but you can't perform ${activityToUpdate.name} during the COVID`,
                    {
                        appearance: 'error',
                        autoDismiss: true,
                    }
                )
                sendSyncDB = false
            }
        })
        if (sendSyncDB) {
            Promise.all(requests.map((req) => dataProvider(req)))
                .then(() => {
                    loadActivitiesFromDB()
                })
                .catch((error) => {
                    addToast(`Error on DB`, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                })
        }
    }

    const handleSelectActivity = (selected, id) => {
        setSelectedActivities({
            ...selectedActivities,
            [id]: selected,
        })
    }
    useEffect(() => {
        loadActivitiesFromDB()
    }, [])

    return (
        <div className={'container'}>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Activity name</th>
                        <th>COVID friendly</th>
                        <th>Times performed</th>
                    </tr>
                </thead>
                <tbody>
                    {activities?.map((activity) => {
                        return (
                            <ActivitiesItem
                                handleSelectActivity={handleSelectActivity}
                                key={activity.id}
                                id={activity.id}
                                activityName={activity.name}
                                covidFriendly={activity.covidFriendly}
                                timesPerformed={activity.timesPerformed}
                            />
                        )
                    })}
                </tbody>
            </Table>
            {Object.values(selectedActivities).some(
                (selectedActivity) => selectedActivity
            ) ? (
                <Button
                    onClick={(e) => {
                        handlePerformActivities(e)
                    }}
                >
                    Perform Activities
                </Button>
            ) : null}
        </div>
    )
}

export default ActivitiesTable
