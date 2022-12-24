import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(isBetween)
dayjs.extend(weekday)

describe('payments page', () => {
  it('count valid payments for the current week', async () => {
    // only desktop
    cy.viewport(851, 789)

    const start = dayjs().weekday(0)
    const end = dayjs().weekday(6)

    cy.visit('/')

    cy.contains('Esta semana').click()
    const rows = cy.get('table').find('tbody').find('tr')

    let totalItems = 0

    await new Cypress.Promise((resolve, reject) => {
      rows
        .each((elem) => {
          elem.find('td').each((index, row) => {
            if (index === 1) {
              const date = row.textContent?.split(' ')[0]
              const dateFormatted = date?.split('/').reverse().join('-')
              const inCurrentWeek = dayjs(dateFormatted).isBetween(start, end)
              if (inCurrentWeek) {
                totalItems += 1
              }
            }
          })
        })
        .then(() => {
          return resolve()
        })
    })

    rows.should('have.length', totalItems)
  })
})
