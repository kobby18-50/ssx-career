import { BadRequestError } from "../errors/index.js"


const checkValidDate = ({startDate, endDate}) => {
    if (endDate < startDate || endDate === startDate) {
        throw new BadRequestError('Check values for start date and end date')
    }

    console.log(startDate, endDate)
}

export default checkValidDate