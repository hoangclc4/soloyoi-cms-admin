<template>
  <html class="no-js responsive" lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="author" content="FOODCONNECTION" />
      <title>パスワードの再設定</title>

      <!-- Social Share - Facebook -->
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:url" content="https://www.xxxxxx.com" />
      <meta
        property="og:image"
        content="https://www.xxxxxx.com/shared/img/shared/ogp.png"
      />
      <meta property="og:title" content="title" />
      <meta property="og:site_name" content="title" />
      <meta property="og:description" content="description" />
      <meta property="fb:app_id" content="__FB_APP_ID__" />

      <!-- SEO -->
      <meta name="keywords" content="keywords" />
      <meta name="description" content="description" />

      <!-- Mobile -->
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="format-detection"
        content="telephone=no, date=no, address=no, email=no"
      />

      <!-- Viewport -->
      <meta name="viewport" content="width=device-width, shrink-to-fit=no" />

      <!-- Profiles -->
      <link rel="canonical" href="https://www.xxxxxx.com" />
      <link rel="profile" href="http://microformats.org/profile/hcard" />
      <link
        rel="apple-touch-icon"
        href="statics/shared/img/shared/apple-touch-icon.png"
      />
      <link rel="shortcut icon" href="statics/shared/img/shared/favicon.ico" />

      <!-- Styles -->
      <link rel="stylesheet" href="statics/shared/css/font.css" />
      <link rel="stylesheet" href="statics/shared/css/common.css" />
      <link rel="stylesheet" href="statics/shared/css/shared.css" />
      <link rel="stylesheet" href="statics/shared/css/animate.min.css" />
      <link rel="stylesheet" href="statics/shared/css/hamburgers.min.css" />
      <link rel="stylesheet" href="statics/shared/css/top.css" />
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,500,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif+JP:400,500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Oswald:400,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Serif&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <main>
        <header>
          <div id="key">
            <p class="ttl">
              全日本一人呑み協会<br />
              公式アプリ
            </p>
            <p class="logo non-over">
              <a href="index.html"
                ><img
                  src="statics/shared/img/shared/logo.png"
                  alt="そろよい"
                  width="253"
                  height="137"
              /></a>
            </p>
          </div>
          <div class="wrap">
            <h1>パスワードの再設定</h1>
          </div>
        </header>
        <section>
          <div id="sec1">
            <div class="wrap">
              <div class="box">
                <h2>パスワードの再設定</h2>
                <p>
                  新しいパスワードを入力してください。<br />
                  パスワードは8文字以上の半角英数字を指定してください。
                </p>
                <dl>
                  <dt>新しいパスワード</dt>
                  <dd>
                    <!-- <input type="text" name="password" value="" /> -->
                    <q-input
                      v-model="form.newPassword"
                      @keyup.enter="submit"
                      :error="$v.form.newPassword.$error"
                      @blur="$v.form.newPassword.$touch"
                      type="password"
                      dense
                      outlined
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>新しいパスワード（確認用）</dt>
                  <dd>
                    <q-input
                      v-model="form.confirmPassword"
                      @keyup.enter="submit"
                      :error="$v.form.confirmPassword.$error"
                      @blur="$v.form.confirmPassword.$touch"
                      type="password"
                      dense
                      outlined
                    />
                  </dd>
                </dl>
                <p class="button">
                  <!-- <button type="submit" class="form-submit" onclick="submit()">
                    パスワードを再設定する
                  </button> -->
                  <q-btn
                    label="パスワードを再設定する"
                    color="primary"
                    class="form-submit"
                    @click="submit"
                    style="padding: 20px 40px;
                      color: #FEFEFE;
                      font-size: 125%;
                      background: #2ba0c3 !important;
                      border-radius: 5px;
                      border-style: none;
                      display: block;
                      margin: 30px auto 0;
                      cursor: pointer;
                      min-height: 63px !important"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div class="wrap">
            <p class="ttl_logo sp">
              全日本一人呑み協会<br />
              公式アプリ
            </p>
            <p class="logo">
              <img
                src="statics/shared/img/shared/f_logo.png"
                alt="そろよい"
                width="250"
                height="142"
              />
            </p>
            <p class="btn">
              <a href="https://www.hitorinomi.jp/" target="_blank"
                >全日本一人呑み協会公式サイト</a
              >
            </p>
            <nav class="nav-inline">
              <a href="terms/user.html" target="_blank">利用規約</a
              ><a href="privacy/index.html" target="_blank"
                >プライバシーポリシー</a
              ><a
                href="https://www.foodconnection.jp/cookie/cookie_share.html"
                target="_blank"
                rel="nofollow"
                >Cookie等情報の取り扱いについて</a
              >
            </nav>
            <address>
              &copy; SOLOYOI. All Rights Reserved.
            </address>
          </div>
        </footer>
      </main>
      <div id="fb-root"></div>
    </body>
    <!-- Libraries script -->
    <!-- <script src="statics/shared/js/base.js"></script>
    <script src="statics/shared/js/autoload.js"></script>
    <script src="statics/shared/js/jquery.min.js"></script>
    <script src="statics/shared/js/common.js"></script>
    <script src="statics/shared/js/shared.js"></script>
    <script src="statics/shared/js/jquery.bxslider.min.js"></script> -->
  </html>
</template>
<script>
// var h = 428;
// // eslint-disable-next-line no-unused-vars
// var w = 640;
// // eslint-disable-next-line no-undef
// var wW = $(window).width();
// // eslint-disable-next-line no-undef
// $('.bx-controls-direction').css('top', (wW * h) / (640 * 2) + 'px');
// // eslint-disable-next-line no-undef
// $('.bx-wrapper .bx-pager').css('top', (wW * h) / (640 * 2) + 'px');
// // eslint-disable-next-line no-undef
// $(window).resize(function() {
//   // eslint-disable-next-line no-undef
//   wW = $(window).width();
//   // eslint-disable-next-line no-undef
//   $('.bx-controls-direction').css('top', (wW * h) / (640 * 2) + 'px');
//   // eslint-disable-next-line no-undef
//   $('.bx-wrapper .bx-pager').css('top', (wW * h) / (640 * 2) + 'px');
// });
//import ChangeLocalButton from '../components/ChangeLocaleButton';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
//import custom from '../../statics/shared/js/custom.js';
export default {
  name: 'userResetPassword',
  // components: {
  //   'change-locale-button': ChangeLocalButton,
  // },
  data() {
    return {
      loading: false,
      isNewPassword: true,
      isConfirmPassword: true,
      form: {
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  validations: {
    form: {
      newPassword: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsNewPassword: sameAs('newPassword') },
    },
  },
  // mounted() {
  //   this.customFiles();
  // },
  methods: {
    ...mapActions('auth', ['apiResetPasswordUserAction']),

    submit() {
      this.loading = true;
      this.$v.form.$touch();
      console.log(this.$v.form);
      if (this.$v.form.$error) {
        this.loading = false;
        this.$q.notify({
          message: this.$t('reviewFieldAgain'),
          color: 'deep-orange-4',
        });
      } else {
        this.saveResetPassword(this.form.newPassword);
      }
    },
    async saveResetPassword(newPassword) {
      console.log(this.$route.query.token);
      // Call API reset Password User
      const apolloClient = this.$apollo.provider.defaultClient;
      const input = { newPassword, token: this.$route.query.token };
      const result = await this.apiResetPasswordUserAction({
        apolloClient,
        input,
      });

      if (result.requestResolved) {
        // Reset success
        this.$q.notify({
          message: this.$t('api.resetPasswordUserSuccess'),
          color: 'green-5',
        });
        this.loading = false;
      } else {
        result.systemError
          ? // Reset failed, got something wrong with system
            this.$q.notify({
              message: `${result.systemError}`,
              color: 'deep-orange-4',
            })
          : // Reset failed, got something wrong with user
            this.$q.notify({
              message: this.$t('api.resetPasswordUserFailed'),
              color: 'deep-orange-4',
            });

        this.loading = false;
      }
    },
  },
};
</script>
