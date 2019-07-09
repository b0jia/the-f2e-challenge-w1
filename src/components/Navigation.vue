<template>
  <nav class="global-navigation">
    <div class="navbar-menu">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            :to="{ name: 'todos' }"
            class="nav-link"
          >
            <i class="material-icons">list</i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'analytics' }"
            class="nav-link"
          >
            <i class="material-icons">insert_chart</i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'settings' }"
            class="nav-link"
          >
            <i class="material-icons">library_music</i>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-brand">
      <div class="brand-title">POMODORO</div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'GlobalNavigation',
};
</script>
