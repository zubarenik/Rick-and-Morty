<template>
    <div class="characters">
        <v-row>
            <h1 style="padding: 10px 0 10px 0">Characters</h1>
        </v-row>

        <v-banner
            color="#1C1A1C"
            height="inherit"
            width="100%"
            single-line
            sticky
            app
            style="margin: 15px 0 15px 0"
            >
            <v-container>
                <v-row>
                    <v-col
                    cols="12"
                    md="4"
                    >
                        <v-text-field
                        label="Name" 
                        outlined
                        clearable
                        v-model="name"
                        @input="setName"
                        hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="4"
                    >
                        <v-select
                        :items="statusItems"
                        label="Status"
                        outlined
                        clearable
                        v-model="status"
                        @change="setStatus"
                        hide-details
                        ></v-select>
                    </v-col>
                    <v-col
                    cols="12"
                    md="4"
                    >
                        <v-select
                        :items="genderItems"
                        label="Gender"
                        outlined
                        clearable
                        v-model="gender"
                        @change="setGender"
                        hide-details
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-banner>

        <v-row 
        v-if="items.length > 0"
        >
            <v-col 
            cols="6"
            md="3" 
            v-for="item in items" 
            :key="item.id"
            >
                <v-card>
                    <v-img 
                    :src="item.image"
                    lazy-src="/default.png"
                    width="100%"
                    height="100%"
                    ></v-img>    
                    
                    <v-card-title class="title">{{item.name}}</v-card-title>
                    <v-card-subtitle>{{item.species}}</v-card-subtitle>
                    <v-card-subtitle class="d-flex align-center">
                        {{item.status}}
                        <div 
                        class="status" 
                        :style="{ backgroundColor: setStatusColor(item.status) }"
                        ></div>
                    </v-card-subtitle>
                </v-card>
            </v-col>

            <v-col 
            class="d-flex justify-center"
            cols="12"
            >
                <p>No more characters here.</p>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col
            class="d-flex justify-center"
            cols="12"
            >
                <p>No characters found.</p>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: 'https://rickandmortyapi.com/api/character/',
            nextUrl: '',
            statusItems: ['Dead', 'Alive', 'Unknown'],
            genderItems: ['Female', 'Male', 'Genderless', 'Unknown'],
            items: [],
            name: '',
            status: '',
            gender: '',
        }
    },
    methods: {
        setStatusColor(status) {
            if (status === 'Dead') {
                return 'red'
            }
            if (status === 'Alive') {
                return 'green'
            }
            return 'grey'
        },
        clear() {
            this.items = []
            this.nextUrl = ''
        },
        setName() {
            this.clear()
            this.getData(this.url)
        },
        setStatus() {
            this.clear()
            this.getData(this.url)
        },
        setGender() {
            this.clear()
            this.getData(this.url)
        },
        getData(url) {
            if (url === null) {
                return
            }

            this.$axios.get(url, {
                params: {
                    name: this.name,
                    status: this.status,
                    gender: this.gender
                }
            })
            .then((response) => {
                if (response.data.info.next === this.nextUrl) {
                    return
                }

                this.items.push(...response.data.results)
                this.nextUrl = response.data.info.next
            })
            .catch((exception) => {
                this.clear()
            });
        },
        handleScroll() {
            window.onscroll = () => {
                const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 30 >= document.documentElement.offsetHeight

                if (bottomOfWindow) {
                    this.getData(this.nextUrl)
                }
            }
        }
    },
    mounted() {
        this.handleScroll()
       this.getData(this.url)
    },
}
</script>

<style>
.title {
    clear: both;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 0;
}
.status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 10px;
}

@media only screen and (max-width: 960px) {
    .v-banner {
        position: static !important;
    }
}
</style>
