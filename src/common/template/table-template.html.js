export const TABLE_TEMPLATE = {
    BASIC: `
        <table>
            <thead>
                <tr>
                    <th v-for="(title, key) in headers"
                        @click="sortBy(key)">
                        {{ title }}
                        <span v-if="orderBy == key">
                            {{ direction == 'asc' ? '▲' : '▼' }}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot v-for="row in rows" :row="row"></slot>
            </tbody>
        </table>
    `
};

export const GRID_TEMPLATE = {
    BASIC: `
    <grid :rows="orders"
        :headers="headers"
        @sorted="loadOrders">
        <template slot-scope="props">
            <tr @click="goToOrder(props.row.id)">
                <td>{{ props.row.id }}</td>
                <td>{{ props.row.subtotal }}</td>
                <td>{{ props.row.discount }}</td>
                <td>{{ props.row.total }}</td>
            </tr>
        </template>
    </grid>
    `
};
