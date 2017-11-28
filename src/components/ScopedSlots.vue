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

export default {
    // el: '#app',
    name: 'ScopedSlots',
    created () {
        console.log(render('abc${a}asdas', {a: 23, b: 44})); // abc23asdas
        console.log(render('abc${a.c}asdas', {a: {c: 22, d: 55}, b: 44})); // abc22asdas
    }
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

function Prop (obj, is, value) {
    if (typeof is === 'string') {
        is = is.split('.');
    }
    if (is.length === 1 && value !== undefined) {
        obj[is[0]] = value;
        return obj;
    } else if (is.length === 0) {
        return obj;
    } else {
        var prop = is.shift();
        // Forge a path of nested objects if there is a value to set
        if (value !== undefined && obj[prop] === undefined) {
            obj[prop] = {};
        }
        return Prop(obj[prop], is, value);
    }
}

function render (str, obj) {
    return str.replace(/\$\{(.+?)\}/g, (match, p1) => { return Prop(obj, p1); });
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

