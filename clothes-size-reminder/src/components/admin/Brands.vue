<template>
  <div id="brands">
    <v-skeleton-loader
        :type="skeletonType"
        :loading="isLoading"
        transition="fade-transition"
      >
      <v-data-table
        :headers="headers"
        :items="brands"
        :disable-pagination="true"
        :hide-default-footer="true"
        sort-by="name"
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
            <v-btn text icon v-on:click="refreshBrand">
              <v-icon>mdi-cached</v-icon>
            </v-btn>
            <create-brand v-on:brand-created="onNewBrandCreated">
              <template v-slot:button>
                <v-btn color="primary" dark>
                  Create new Brand
                </v-btn>
              </template>
            </create-brand>
          </v-toolbar>
        </template>
        <template v-slot:item.isValidated="{ item }">
          <v-chip v-if="!item.isValidated"
            small
            color="warning"
            :close="true"
            close-icon="mdi-checkbox-marked-circle"
            @click:close="validateBrand(item)"
          >
            To be validated
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <update-brand :brand-to-update="{...item}" v-on:brand-update="onBrandUpdated">
            <template v-slot:button>
              <v-btn text icon>
                <v-icon small class="mr-2">mdi-pencil</v-icon>
              </v-btn>
            </template>
          </update-brand>
          <delete-brand :brand-to-delete="item" v-on:brand-delete="onBrandDeleted">
            <template v-slot:button>
              <v-btn text icon>
                <v-icon small class="mr-2">mdi-delete</v-icon>
              </v-btn>
            </template>
          </delete-brand>
        </template>
        <template v-slot:no-data>
          No data
        </template>
      </v-data-table>
      </v-skeleton-loader>
  </div>
</template>

<script lang="ts">
import Axios, { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import createBrand from '@/components/shared/brands/create-brand.vue';
import deleteBrand from '@/components/shared/brands/delete-brand.vue';
import updateBrand from '@/components/shared/brands/update-brand.vue';
import ITableHeader from '@/utils/types/table-header';
import { IBrand } from '@/utils/types/brand';
import { BRAND_GET_ALL, BRAND_UPDATE } from '@/utils/api-endpoints';

@Component({
  components: {
    'create-brand': createBrand,
    'delete-brand': deleteBrand,
    'update-brand': updateBrand,
  },
})
export default class Brands extends Vue {
  public isLoading: boolean = false;

  public skeletonType: string = 'table';

  public headers: ITableHeader[] = [
    {
      text: 'Name',
      value: 'name',
      width: '40%',
    }, {
      text: 'Corporate name',
      value: 'corporateName',
      width: '35%',
    }, {
      text: 'Status',
      value: 'isValidated',
      width: '15%',
    }, {
      text: 'Actions',
      value: 'action',
      sortable: false,
      filterable: false,
      width: '10%',
    },
  ];

  public brands: IBrand[] = [];

  public mounted() {
    this.loadBrands();
  }

  public onNewBrandCreated(): void {
    this.loadBrands();
  }

  public onBrandDeleted(brandDeleted: IBrand): void {
    this.brands = [...this.brands].filter(brand => brand.id !== brandDeleted.id);
  }

  public onBrandUpdated(brandUpdated: IBrand): void {
    this.brands = [...this.brands].map((brand) => {
      if (brand.id === brandUpdated.id) {
        return { ...brandUpdated };
      }

      return { ...brand };
    });
  }

  public refreshBrand(): void {
    this.loadBrands();
  }

  public loadBrands(): void {
    this.isLoading = true;
    Axios.get<any, AxiosResponse<IBrand[]>>(BRAND_GET_ALL)
      .then((result) => {
        console.log(result);
        this.brands = (result as AxiosResponse<IBrand[]>).data;
      })
      .catch((error) => {
        console.error(error);
        debugger;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  public EditBrand = (brand: any) => {
    console.error('edit', brand);
  }

  public validateBrand(brand: IBrand): void {
    const copyOldBrand: IBrand = { ...brand };
    brand.isValidated = true;
    const newBrand: IBrand = { ...brand };
    Axios.put<any, AxiosResponse<IBrand>>(`${BRAND_UPDATE}/${newBrand.id}`, newBrand)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        this.brands = this.brands.map((b: IBrand) => {
          let br: IBrand = b;
          if (br.id === newBrand.id) {
            br = copyOldBrand;
          }
          return br;
        });
      });
  }
}
</script>

<style lang="scss" scoped>
#brands {
  padding-bottom: 40px;
}
</style>
