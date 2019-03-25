<template>
  <section class="section">
    <div class="container">
      <b-collapse class="card">
        <div slot="trigger" slot-scope="props" class="card-header">
          <p class="card-header-title">DECODE</p>
          <a class="card-header-icon">
            <i v-if="props.open" class="fa fa-chevron-up" aria-hidden="true"></i>
            <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
          </a>
        </div>

        <div class="card-content">
          <div class="content">Digital Identity Demo App</div>
        </div>
        <footer class="card-footer"></footer>
      </b-collapse>
    </div>
  </section>
</template>
