export const ALMATY_CODE: number = 4;

export const PAYMENTS_BY_DATA = {
    1: {
        1: [1, 3, 4, 5],
        2: [2, 3, 5],
        3: [3, 5]
    },
    2: {
        1: [1, 3, 4, 5],
        2: [2, 3, 5],
        3: [5, 6, 7]
    }
}

interface IPayment {
    id: number;
    title: string;
    commission: number;
    online?: boolean;
}

export class Payment implements IPayment {
    id: number;
    title: string;
    commission: number;
    online: boolean;
    constructor(json: IPayment) {
        _(this).extendWith(json).commit();
        this.online = json.online || false;
    }
    public getCommission(price: number): number {
        return price * this.commission;
    }
}

export const PAYMENTS: Payment[] = [
    new Payment({
        id: 1,
        title: 'Оплата наличными в офисе',
        commission: 0
    }),
    new Payment({
        id: 2,
        title: 'Оплата наличными курьеру',
        commission: 0
    }),
    new Payment({
        id: 3,
        title: 'Оплата  с Карты/Банка/Банкомата на Карту/Счёт',
        commission: 0
    }),
    new Payment({
        id: 4,
        title: 'Оплата с Карты в офисе + 4% комиссия',
        commission: 0.04
    }),
    new Payment({
        id: 5,
        title: 'Оплата с Карты (Visa, MasterCard, American Express) на карту онлайн-платеж + 4% комиссия c транзакции',
        commission: 0.04,
        online: true
    }),
    new Payment({
        id: 6,
        title: 'Оплата с Карты (Visa, MasterCard, American Express) а также Банка/Банкомата на карту оффлайн-платеж 0% комиссия с транзакции',
        commission: 0
    }),
    new Payment({
        id: 7,
        title: 'Оплата QIWI + 4% комиссия',
        commission: 0.04
    })
]

interface IDelivery {
    id: number;
    title: string;
    isAlmaty: boolean;
    info?: string;
    infoShown?: boolean;
    type: string;
}

export class Delivery implements IDelivery {
    id: number;
    title: string;
    isAlmaty: boolean;
    info: string;
    infoShown: boolean;
    type: string;
    constructor(json: IDelivery) {
        _(this).extendWith(json).commit();
    }
    isShown(townId) {
        if (townId == ALMATY_CODE && this.isAlmaty) return true;
        if (townId != ALMATY_CODE && !this.isAlmaty) return true;
        return false;
    }
}

export const DELIVERIES: Delivery[] = [
    new Delivery({
        id: 1,
        title: 'Самовывоз',
        isAlmaty: true,
        type: 'self',
        info: 'Адрес: г. Алматы, ул. Багратиона, 4'
    }),
    new Delivery({
        id: 2,
        title: 'Доставка Алматы',
        isAlmaty: true,
        type: 'adress',
        info: `<b>Квадрат доставки:</b>
        <div class="flex">Аль-Фараби - Саина - Северное кольцо - Бекмаханова - Майлина - Рыскулова - Восточная Объездная Дорога</div>
        <div class="flex"><b class="inline">Заказ на сумму более 100 000 тенге</b> - перевозка не требует оплаты.</div>
        <div class="flex"><b class="inline"> При покупке стоимостью менее 100 000 тенге</b> - 1000 тенге доставка.</div>
        <div class="flex">Товар будет доставлен к Вашему подъезду!</div>
        <div class="flex">Водитель машину <b class="inline">не покидает</b>!</div>`
        <div class="flex">Стоимость и сроки доставки за пределами квадрата, оговариваются с менеджерами.</div>
        <div class="flex">Мы не можем гарантировать доставку товара день в день и не можем гарантировать доставку в труднодоступные места. Мы оставляем за собой права отказать в доставке без объяснения причины, но уведомив клиента. После оформления заказа, Вам обязательно позвонят в рабочее время для согласования доставки.</div>`

    }),
    new Delivery({
        id: 3,
        title: 'Доставка Exline',
        isAlmaty: false,
        type: 'exline'
    })
];


interface IPerson {
    id: number;
    title: string;
}

export class Person implements IPerson {
    public id: number;
    public title: string;
    constructor(json: IPerson) {
        _(this).extendWith(json).commit();
    }
}

export const PERSONS: Person[] = [
    new Person({
        id: 1,
        title: 'Юридическое лицо (ТОО / ИП) без НДС'
    }),
    new Person({
        id: 2,
        title: 'Физическое лицо'
    })
];
