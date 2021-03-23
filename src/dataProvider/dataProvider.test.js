import axios from 'axios'
import { ACTIVITIES_ENDPOINT } from '../config'
import { dataProvider } from './dataProvider'

jest.mock('axios')

test('Data Provider module tests, call get method', () => {
    const resp = [
        {
            id: 1,
            name: 'Netflix & chill',
            covidFriendly: true,
            timesPerformed: 0,
        },
    ]
    axios.get.mockResolvedValue(resp)
    dataProvider({
        method: 'GET',
        url: ACTIVITIES_ENDPOINT,
    })
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(ACTIVITIES_ENDPOINT)
})

test('Data Provider module tests, call put method', () => {
    const resp = [
        {
            id: 1,
            name: 'Netflix & chill',
            covidFriendly: true,
            timesPerformed: 1,
        },
    ]
    axios.put.mockResolvedValue(resp)
    dataProvider({
        method: 'PUT',
        url: `${ACTIVITIES_ENDPOINT}/${resp.id}`,
        data: resp,
    })
    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toHaveBeenCalledWith(
        `${ACTIVITIES_ENDPOINT}/${resp.id}`,
        resp
    )
})

test('Data Provider module tests, call post or delete method should return undefined', async () => {
    const resp = [
        {
            id: 1,
            name: 'Netflix & chill',
            covidFriendly: true,
            timesPerformed: 1,
        },
    ]

    const responsePost = await dataProvider({
        method: 'POST',
        url: `${ACTIVITIES_ENDPOINT}/${resp.id}`,
        data: resp,
    })
    expect(responsePost).toBeFalsy()

    const responseDelete = await dataProvider({
        method: 'DELETE',
        url: `${ACTIVITIES_ENDPOINT}/${resp.id}`,
    })
    expect(responseDelete).toBeFalsy()
    const responseDefault = await dataProvider({
        url: `${ACTIVITIES_ENDPOINT}/${resp.id}`,
    })
    expect(responseDefault).toBeFalsy()
})
