<template>
    <q-page>
        <div class="row q-mb-md">
            <div class="col bg-primary">1</div>
            <div class="col bg-secondary">2</div>
            <div class="col bg-accent">3</div>
        </div>
        <div class="row q-mb-md">
            <div class="col bg-primary">1</div>
            <div class="col col-5 bg-secondary">2</div>
            <div class="col col-6 bg-accent">3</div>
        </div>

        <div class="row justify-center q-mb-md">
            <!-- <div class="col bg-primary">1</div> -->
            <div class="col col-4 bg-secondary">2</div>
            <div class="col col-4 bg-accent">3</div>
        </div>

        <div class="row justify-end q-mb-md">
            <!-- <div class="col bg-primary">1</div> -->
            <div class="col col-4 bg-secondary">2</div>
            <div class="col col-4 bg-accent">3</div>
        </div>
        <div class="row justify-between q-mb-md">
            <!-- <div class="col bg-primary">1</div> -->
            <div class="col col-4 bg-secondary">2</div>
            <div class="col col-4 bg-accent">3</div>
        </div>
        <q-separator spaced />

        <div class="row q-mb-md justify-between">
            <div class="col-12 col-md-4 col-sm-6 bg-primary">1</div>
            <div class="col-12 col-md-4 col-sm-6 bg-secondary">2</div>
            <!-- <div class="col col-4 bg-accent">3</div> -->
        </div>

        <q-separator spaced />  

        <div class="row q-mb-md">
            <div class="square-box bg-primary"></div>
            <div class="square-box bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>

        <div class="row q-mb-md  justify-between">
            <div class="square-box bg-primary"></div>
            <div class="square-box bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>

        <div class="row q-mb-md  justify-end">
            <div class="square-box bg-primary"></div>
            <div class="square-box bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>
        <div class="row q-mb-md  justify-around">
            <div class="square-box bg-primary"></div>
            <div class="square-box bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>

        <div class="column q-mb-md items-center bg-dark">
            <div class="square-box bg-primary"></div>
            <div class="square-box bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>

        <div class="column custom-height q-mb-md items-center justify-center bg-dark">
            <div class="square-box bg-primary"></div>
            <div class="square-box bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>

        <div class="column custom-height q-mb-md items-center justify-between bg-dark">
            <div class="square-box bg-primary"></div>
            <div class="square-box bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>

        <div class="column custom-height q-mb-md items-center justify-between bg-dark">
            <div class="square-box self-start bg-primary"></div>
            <div class="square-box self-end bg-secondary"></div>
            <div class="square-box bg-accent"></div>
        </div>

    </q-page>
</template>

<script>
export default {

}
</script>

<style scoped>
.custom-height {
    height: 300px;
}
.col, .col-4, .col-6, .col-12 {
    height: 200px;
    border: 1px solid black;
    text-align: center;
    color: white;
    font-size: 30px;
}
.row{
    background-color: #f8bebe;
    height:200px;
}

.square-box{
    height: 50px;
    width: 50px;
}

</style>