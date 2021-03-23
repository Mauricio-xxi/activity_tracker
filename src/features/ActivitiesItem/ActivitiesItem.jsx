import React from 'react'
import { Label, Input } from 'reactstrap'

const ActivitiesItem = ({
    id,
    activityName,
    covidFriendly,
    timesPerformed,
    handleSelectActivity,
}) => {
    return (
        <tr>
            <th
                scope="row"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <Label check>
                    <Input
                        data-testid={`inputCheckbox${id}`}
                        type="checkbox"
                        onChange={(e) => {
                            handleSelectActivity(e.target.checked, id)
                        }}
                    />
                </Label>
            </th>
            <td>{activityName}</td>
            <td>{covidFriendly ? 'Yes' : 'No'}</td>
            <td>{timesPerformed}</td>
        </tr>
    )
}

export default ActivitiesItem
