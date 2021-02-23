import dayjs from 'dayjs'
import relativeTime from  'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

dayjs.extend(relativeTime)

class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id
        this.items = items
        this.totalAmount = totalAmount
        this.date = date
    }

    get readableDate() {
        /* return this.date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) */
        return dayjs(this.date).locale("es").format('DD MMMM YYYY, hh:mm')
    }
}

export default Order