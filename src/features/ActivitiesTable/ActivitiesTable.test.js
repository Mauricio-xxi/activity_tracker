import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import ActivitiesTable from './ActivitiesTable'
import { ToastProvider } from 'react-toast-notifications'
import * as dataProvider from '../../dataProvider/dataProvider'
import { ACTIVITIES_ENDPOINT } from '../../config'

const dataProviderMock = jest.spyOn(dataProvider, 'dataProvider')

describe('Activities Table Module', () => {
    test('Activities Table render test', () => {
        render(
            <ToastProvider>
                <ActivitiesTable />
            </ToastProvider>
        )
        expect(screen.getByText('Activity name')).toBeInTheDocument()
        expect(screen.getByText('COVID friendly')).toBeInTheDocument()
        expect(screen.getByText('Times performed')).toBeInTheDocument()
    })

    test('Activities Table load Data, select a covid friendly activity and save it to db', async () => {
        dataProviderMock.mockImplementationOnce(() => [
            {
                id: 1,
                name: 'Netflix & chill',
                covidFriendly: true,
                timesPerformed: 2,
            },
        ])
        render(
            <ToastProvider>
                <ActivitiesTable />
            </ToastProvider>
        )
        await waitFor(() => {
            expect(screen.getByText('Netflix & chill')).toBeInTheDocument()
            const input = screen.getByTestId(`inputCheckbox1`)
            fireEvent.click(input, { target: { value: true } })
            expect(input.checked).toBe(true)
            expect(screen.getByText('Perform Activities')).toBeInTheDocument()
            const button = screen.getByText('Perform Activities')
            fireEvent.click(button, { target: { value: true } })
            expect(dataProviderMock).toHaveBeenCalled()
        })
        expect(dataProviderMock).toHaveBeenCalled()
        expect(dataProviderMock).toHaveBeenCalledWith({
            method: 'GET',
            url: ACTIVITIES_ENDPOINT,
        })
    })

    test('Activities Table load Data, select a non covid friendly activity and save it to db', async () => {
        dataProviderMock.mockImplementationOnce(() => [
            {
                id: 1,
                name: 'Birthday in a restaurant',
                covidFriendly: false,
                timesPerformed: 2,
            },
        ])
        render(
            <ToastProvider>
                <ActivitiesTable />
            </ToastProvider>
        )
        await waitFor(() => {
            expect(
                screen.getByText('Birthday in a restaurant')
            ).toBeInTheDocument()
            const input = screen.getByTestId(`inputCheckbox1`)
            fireEvent.click(input, { target: { value: true } })
            expect(input.checked).toBe(true)
            expect(screen.getByText('Perform Activities')).toBeInTheDocument()
            const button = screen.getByText('Perform Activities')
            fireEvent.click(button, { target: { value: true } })

            expect(
                screen.getByText(
                    "Sorry but you can't perform Birthday in a restaurant during the COVID"
                )
            ).toBeInTheDocument()
        })
        expect(dataProviderMock).toHaveBeenCalled()
        expect(dataProviderMock).toHaveBeenCalledWith({
            method: 'GET',
            url: ACTIVITIES_ENDPOINT,
        })
    })
})
