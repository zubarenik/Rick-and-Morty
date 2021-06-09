<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    > 
      <v-list>
        <hide-at breakpoint="large">
          <v-list-item>
            <v-list-item-action>
              <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </hide-at>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-around align-end" style="flex: 1 0 auto; margin-bottom: 10px">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
            tag="a" 
            v-bind="attrs"
            v-on="on"
            >{{ 'mdi-facebook' }}</v-icon>
          </template>
          <span>facebook</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
            tag="a" 
            v-bind="attrs"
            v-on="on"
            >{{ 'mdi-instagram' }}</v-icon>
          </template>
          <span>instagram</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
            tag="a" 
            v-bind="attrs"
            v-on="on"
            >{{ 'mdi-reddit' }}</v-icon>
          </template>
          <span>reddit</span>
        </v-tooltip>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
</style>

<script>
import { showAt, hideAt } from 'vue-breakpoints'

export default {
  components: {
    hideAt,
    showAt
  },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account-multiple',
          title: 'Characters',
          to: '/characters'
        },
        {
          icon: 'mdi-map-marker-multiple',
          title: 'Locations',
          to: '/locations'
        },
        {
          icon: 'mdi-dice-6',
          title: 'Episodes',
          to: '/episodes'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Rick and Morty'
    }
  }
}
</script>
