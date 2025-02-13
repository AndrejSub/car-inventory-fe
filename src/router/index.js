import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CarsView from "@/views/CarsView.vue";
import PartsView from "@/views/PartsView.vue";
import CarDetail from "@/views/CarDetailView.vue";
import CarFormView from "@/views/CarFormView.vue";
import CarUpdateFormView from "@/views/CarUpdateView.vue";
import PartUpdateFormView from "@/views/PartUpdateFormView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        { path: "/cars", component: CarsView },
        { path: "/parts", component: PartsView },
        { path: "/cars/:id", name: "carDetail", component: CarDetail, props: true },
        { path: "/cars/create", component: CarFormView },
        { path: "/cars/:id/update", name: "carUpdate", component: CarUpdateFormView },
        { path: "/parts/:id/update", name: "partUpdate", component: PartUpdateFormView }
    ]
});

export default router;
