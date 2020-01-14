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
            <CreateBrand v-on:brand-created="newBrandCreated">
              <template v-slot:button-text>Create new Brand</template>
            </CreateBrand>
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
            To be validated
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
import CreateBrand from '@/components/shared/brands/create-brand.vue';
import TableHeader from '@/utils/types/table-header';

@Component({
  components: {
    CreateBrand,
  },
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

  public newBrandCreated() {
    this.loadBrands();
  }

  public loadBrands() {
    this.isLoading = true;
    // Todo : load brands
    const that = this;
    setTimeout(() => {
      that.brands = [
        {
          Id: 2,
          Name: `Test${(new Date()).toString()}`,
          CorporateName: 'Test corporate',
          IsConfirmed: false,
        },
        {
          Id: 3,
          Name: 'Test2',
          CorporateName: `Test2 corporate2${(new Date()).toString()}`,
          IsConfirmed: true,
        },
      ];
      that.isLoading = false;
    }, 2000);
  }

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
