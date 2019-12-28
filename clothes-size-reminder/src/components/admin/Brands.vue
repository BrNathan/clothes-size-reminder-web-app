<template>
  <div id="brands">
    <v-skeleton-loader
        :type="skeletonType"
        :loading="isLoading"
      >
      <v-data-table
        :headers="headers"
        :items="brands"
        :disable-pagination="true"
        :hide-default-footer="true"
        sort-by="Name"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Brands</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <!-- *** BEGIN NEW BRANDS COMPONENT *** -->
            <!-- <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
            <v-btn small rounded color="primary">New (not working)</v-btn>
            <!-- *** END NEW BRANDS COMPONENT *** -->
          </v-toolbar>
        </template>
        <template v-slot:item.IsConfirmed="{ item }">
          <v-chip v-if="!item.IsConfirmed"
          small
          color="warning"
          :close="true"
          close-icon="mdi-checkbox-marked-circle"
          @click:close="ConfirmBrand(item)"
          >
            To be confirmed
          </v-chip>
        </template>
        <template v-slot:item.Action="{ item }">
          <v-icon small class="mr-2"
          @click="EditBrand(item)"
          >mdi-pencil</v-icon>
          <v-icon small
          @click="DeleteBrand(item)"
          >mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          No data
        </template>
      </v-data-table>
      </v-skeleton-loader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TableHeader from '@/utils/types/table-header';

@Component({
  components: {},
})
export default class Brands extends Vue {
  public isLoading: boolean = false;

  public skeletonType: string = 'table';

  public headers: TableHeader[] = [
    {
      text: 'Name',
      value: 'Name',
    }, {
      text: 'Corporate name',
      value: 'CorporateName',
    }, {
      text: 'Status',
      value: 'IsConfirmed',
    }, {
      text: '',
      value: 'Action',
      sortable: false,
      filterable: false,
    }];

  public brands: any[] = [
    {
      Id: 2,
      Name: 'Test',
      CorporateName: 'Test corporate',
      IsConfirmed: false,
    },
    {
      Id: 3,
      Name: 'Test2',
      CorporateName: 'Test2 corporate2',
      IsConfirmed: true,
    },
  ];

  public EditBrand = (brand: any) => {
    console.error('edit', brand);
  }

  public DeleteBrand = (brand: any) => {
    console.error('delete', brand);
  }

  public ConfirmBrand = (brand: any) => {
    console.error('confirm', brand);
  }
}
</script>

<style lang="scss" scoped>
#brands {
  padding-bottom: 40px;
}
</style>
