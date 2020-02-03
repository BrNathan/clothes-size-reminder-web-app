<template>
  <div id="clothes">
    <v-skeleton-loader
        :type="skeletonType"
        :loading="isLoading"
        transition="fade-transition"
      >
      <v-data-table
        :headers="headers"
        :items="clothes"
        :disable-pagination="true"
        :hide-default-footer="true"
        sort-by="name"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Clothes</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn text icon v-on:click="refreshClothes">
              <v-icon>mdi-cached</v-icon>
            </v-btn>
            <create-clothes v-on:clothes-created="onNewClothesCreated">
              <template v-slot:button>
                <v-btn color="primary" dark>
                  Create new Clothes
                </v-btn>
              </template>
            </create-clothes>
          </v-toolbar>
        </template>
        <template v-slot:item.clothesCategoryId="{ item }">
          <v-chip
            class="ma-2"
            :color="getClothesCategoryColor(item.clothesCategoryId)"
            outlined
          >
            {{getClothesCategoryLabel(item.clothesCategoryId)}}
          </v-chip>
        </template>
        <template v-slot:item.genderId="{ item }">
          <v-icon
            :color="getGenderIconColor(item.genderId)"
            class="mr-2">
            {{getGenderIcon(item.genderId)}}
          </v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <update-clothes :clothes-to-update="{...item}" v-on:clothes-update="onClothesUpdated">
            <template v-slot:button>
              <v-btn text icon>
                <v-icon small class="mr-2">mdi-pencil</v-icon>
              </v-btn>
            </template>
          </update-clothes>
          <delete-clothes :clothes-to-delete="item" v-on:clothes-delete="onClothesDeleted">
            <template v-slot:button>
              <v-btn text icon>
                <v-icon small class="mr-2">mdi-delete</v-icon>
              </v-btn>
            </template>
          </delete-clothes>
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
import { State, Action, Getter } from 'vuex-class';
import ITableHeader from '@/utils/types/table-header';
import { IClothes } from '@/utils/types/clothes';
import { CLOTHES_GET_ALL, CLOTHES_CATEGORY_GET_ALL } from '@/utils/api-endpoints';
import IClothesCategory from '@/utils/types/clothes-category';
import { IGender, GenderEnum, GenderIcon } from '../../utils/types/gender';
import { STORE_REFERENTIAL } from '../../store/namespace';
import createClothes from '@/components/shared/clothes/create-clothes.vue';
import deleteClothes from '@/components/shared/clothes/delete-clothes.vue';
import updateClothes from '@/components/shared/clothes/update-clothes.vue';

@Component({
  components: {
    'create-clothes': createClothes,
    'delete-clothes': deleteClothes,
    'update-clothes': updateClothes,
  },
})
export default class Clothes extends Vue {
  @Getter('genderById', { namespace: STORE_REFERENTIAL }) genderById?: (genderId: number) => IGender;

  @Getter('clothesCategoryById', { namespace: STORE_REFERENTIAL }) clothesCategoryById?: (clothesCategoryId: number) => IClothesCategory;

  @Action('fetchClothesData', { namespace: STORE_REFERENTIAL }) fetchClothesData?: () => void;

  public isLoading: boolean = false;

  public skeletonType: string = 'table';

  public headers: ITableHeader[] = [
    {
      text: 'Code',
      value: 'code',
      width: '20%',
    }, {
      text: 'Label',
      value: 'label',
      width: '30%',
    }, {
      text: 'Category',
      value: 'clothesCategoryId',
      width: '20%',
    }, {
      text: 'Gender',
      value: 'genderId',
      width: '20%',
    }, {
      text: 'Actions',
      value: 'action',
      sortable: false,
      filterable: false,
      width: '10%',
    },
  ];

  public clothes: IClothes[] = [];

  public mounted() {
    this.loadClothes();
  }

  public refreshClothes():void {
    this.loadClothes();
  }

  public loadClothes(): void {
    this.isLoading = true;
    Axios.get<any, AxiosResponse<IClothes[]>>(CLOTHES_GET_ALL)
      .then((result) => {
        // console.log(result);
        this.clothes = (result as AxiosResponse<IClothes[]>).data;
      })
      .catch((error) => {
        // console.error(error);
        // debugger;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  public getGenderIcon(genderId: number): string {
    const genderCode: string = this.genderById ? this.genderById(genderId).code : '';
    switch (genderCode) {
      case GenderEnum.Male:
        return GenderIcon.Male;
      case GenderEnum.Female:
        return GenderIcon.Female;
      case GenderEnum.All:
        return GenderIcon.All;
      default:
        return '';
    }
  }

  public getGenderIconColor(genderId: number): string {
    const genderCode: string = this.genderById ? this.genderById(genderId).code : '';
    switch (genderCode) {
      case GenderEnum.Male:
        return 'blue';
      case GenderEnum.Female:
        return 'pink';
      case GenderEnum.All:
        return 'purple';
      default:
        return '';
    }
  }

  public getClothesCategoryLabel(clothesCategoryId: number): string {
    return this.clothesCategoryById ? this.clothesCategoryById(clothesCategoryId).label : '';
  }

  public getClothesCategoryColor(clothesCategoryId: number): string {
    const clothesCategoryLabel = this.clothesCategoryById ? this.clothesCategoryById(clothesCategoryId).label : '';
    let color: string = 'black';
    if (clothesCategoryLabel !== '') {
      color = Clothes.stringToColour(clothesCategoryLabel);
    }
    return color;
  }

  private static stringToColour(word: string): string {
    let hash = 0;
    for (let i = 0; i < word.length; i += 1) {
      hash = word.charCodeAt(i) + ((hash << 5) - hash);// eslint-disable-line no-bitwise
    }
    let colour = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xFF;// eslint-disable-line no-bitwise
      colour += (`00${value.toString(16)}`).substr(-2);
    }
    return colour;
  }

  public onNewClothesCreated(): void {
    this.loadClothes();
    this.refreshStore();
  }

  public onClothesDeleted(clothesDeleted: IClothes): void {
    this.clothes = [...this.clothes].filter(clothes => clothes.id !== clothesDeleted.id);
    this.refreshStore();
  }

  public onClothesUpdated(clothesUpdated: IClothes): void {
    this.clothes = [...this.clothes].map((clothes) => {
      if (clothes.id === clothesUpdated.id) {
        return { ...clothesUpdated };
      }

      return { ...clothes };
    });
    this.refreshStore();
  }

  private refreshStore(): void {
    if (this.fetchClothesData) {
      this.fetchClothesData();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
