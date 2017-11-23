<template>
    <div id="app">
        <orders-page></orders-page>
    </div>
</template>
<script>
import Vue from 'vue';

var tableTemplate = `
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
`;

Vue.component('grid', {
    props: ['rows', 'headers'],
    template: tableTemplate,
    data () {
        return {
            orderBy: Object.keys(this.headers)[0],
            direction: 'asc'
        };
    },
    watch: {
        'orderBy': 'onChange',
        'direction': 'onChange'
    },
    methods: {
        onChange () {
            this.$emit('sorted', {
                orderBy: this.orderBy,
                direction: this.direction
            });
        },
        sortBy (key) {
            if (this.orderBy === key) {
                this.toggleDirection();
            } else {
                this.orderBy = key;
                this.direction = 'asc';
            }
        },
        toggleDirection () {
            this.direction = this.direction === 'asc' ? 'desc' : 'asc';
        }
    }
});

var gridTemplate = `
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
`;

Vue.component('orders-page', {
    template: gridTemplate,
    data () {
        return {
            headers: {
                id: 'ID',
                subtotal: 'Subtotal',
                discount: 'Discount',
                total: 'Total'
            },
            orders: getOrders()
        };
    },
    methods: {
        loadOrders ({ orderBy, direction }) {
            this.orders = getOrders(orderBy, direction);
        },
        goToOrder (id) {
            alert('Change route to order #' + id);
        }
    }
});

// new Vue({ el: '#app', name: 'ScopedSlots' });
export default {
    // el: '#app',
    name: 'ScopedSlots'
};

function getOrders (orderBy = 'id', direction = 'asc') {
    const orders = [
        {
            id: 1,
            subtotal: 35,
            discount: 5,
            total: 30
        },
        {
            id: 2,
            subtotal: 8,
            discount: 0,
            total: 8
        },
        {
            id: 3,
            subtotal: 26,
            discount: 2,
            total: 24
        }
    ];
    return orders.sort((a, b) => {
        return (a[orderBy] - b[orderBy]) * (direction === 'asc' ? 1 : -1);
    });
}
</script>
<style>
table {
    width: 400px;
    margin: 20px auto;
    border-collapse: collapse;
    font-family: sans-serif;
    font-size: 14px;
    cursor: pointer;
}
tbody > tr:nth-child(odd) {
    background: #eee;
}
th {
    text-align: left;
    font-weight: normal;
    color: #2e6fe8;
    user-select: none;
    width: 25%;
}
th:hover {
    color: #133c8a;
    background: #deeaff;
}
th, td {
    padding: 6px 12px;
}
</style>

