// This is just an example,
// so you can safely delete all default props below

export default {
  /* Common */
  headerTitle: '管理者サイト',
  footerTitle: '© FOODCONNECTION Inc.',
  search: '検索',
  refresh: '更新',
  send: '送信',
  upload: 'アップロード',
  cancel: 'キャンセル',
  confirm: '確定',
  create: '作成',
  edit: '編集',
  update: '更新',
  delete: '削除',
  goBack: '戻る',
  error404: 'お探しのページ（ファイル）は見つかりません',
  freeMember: '無料会員',
  premiumMember: 'プレミアム会員',
  reviewFieldAgain: 'ご入力を再確認してください！',
  pleaseSelectAnImageFile: '画像ファイルを選択してください！',
  notSupportedFileReaderAPI:
    'このブラウザーはFile Readerをサポートしていません',
  pleaseWaitABit: '<p style="font-weight: 700">少々お待ちくださいませ・・・<p>',
  onlyForPremiumRestaurant: 'プレミアム会員にアップグレードしてください！',
  noSupportedBrowser:
    'セキュリティを強化するためにChromeまたはEdgeを推奨しています',
  ok: 'OK',

  /* Call API */
  api: {
    /* Authentication */
    logoutFailed: 'ログアウトできませんでした',
    logoutSuccess: 'ログアウトできました',
    loginFailed: '入力したユーザー名、もしくは、パスワードが間違っています。',
    loginSuccess: 'ログインできました',

    /* Admin Restaurant */
    fetchRestaurantListFailed: '店舗リストを取得できませんでした！',
    fetchRestaurantListSuccess: '店舗リストを取得できました！',
    createRestaurantFailed: '店舗を新規登録できませんでした！',
    createRestaurantSuccess: '店舗を新規登録できました！',
    deleteRestaurantFailed: 'ご指定の店舗を削除できませんでした！',
    deleteRestaurantSuccess: 'ご指定の店舗を削除できました！',

    /* Admin User */
    fetchUserListFailed: 'ユーザーリストを取得できませんでした！',
    fetchUserListSuccess: 'ユーザーリストを取得できました！',

    /* Admin Master Data */
    /* for Restaurant */
    fetchRestaurantMasterdataFailed:
      '店舗向けの入力項目の選択肢を取得できませんでした！',
    fetchRestaurantMasterdataSuccess:
      '店舗向けの入力項目の選択肢を取得できました！',
    createRestaurantMasterdataFailed:
      '店舗向けの入力項目の選択肢を登録できませんでした！',
    createRestaurantMasterdataSuccess:
      '店舗向けの入力項目の選択肢を登録できました！',
    updateRestaurantMasterdataSuccess:
      '店舗向けの入力項目の選択肢を更新できました！',
    deleteRestaurantMasterdataFailed:
      '店舗向けの入力項目の選択肢を削除できませんでした！',
    deleteRestaurantMasterdataSuccess:
      '店舗向けの入力項目の選択肢を削除できました！',
    /* for User */
    fetchUserMasterdataFailed:
      'ユーザー向けの入力項目の選択肢を取得できませんでした！',
    fetchUserMasterdataSuccess:
      'ユーザー向けの入力項目の選択肢を取得できました！',
    createUserMasterdataFailed:
      'ユーザー向けの入力項目の選択肢を登録できませんでした！',
    createUserMasterdataSuccess:
      'ユーザー向けの入力項目の選択肢を登録できました！',
    updateUserMasterdataFailed:
      'ユーザー向けの入力項目の選択肢を更新できませんでした！',
    updateUserMasterdataSuccess:
      'ユーザー向けの入力項目の選択肢を更新できました！',
    deleteUserMasterdataFailed:
      'ユーザー向けの入力項目の選択肢を削除できませんでした！',
    deleteUserMasterdataSuccess:
      'ユーザー向けの入力項目の選択肢を削除できました！',
    /* Japan's Province */
    fetchProvinceFailed: '都道府県情報を取得できませんでした',
    fetchProvinceSuccess: '都道府県情報を取得できました',
    fetchChildProvinceFailed: '市区町村情報を取得できませんでした',
    fetchChildProvinceSuccess: '市区町村情報を取得できました',

    /* Admin Notification */
    fetchAdminNotificationFailed:
      '管理者からの通知リストを取得できませんでした！',
    fetchAdminNotificationSuccess: '管理者からの通知リストを取得できました！',
    createAdminNotificationFailed: '管理者からの通知を送信できませんでした！',
    createAdminNotificationSuccess: '管理者からの通知を送信できました！',
    deleteAdminNotificationFailed: '管理者からの通知を削除できませんでした！',
    deleteAdminNotificationSuccess: '管理者からの通知を削除できました！',

    /* Admin Setting */
    updateAdminPasswordFailed: 'パスワードを更新できませんでした！',
    updateAdminPasswordSuccess: 'パスワードを更新できました！',

    /* Restaurant Setting */
    updateRestaurantSeatAvailableTodayFailed:
      '本日空席あり設定を更新できませんでした！',
    updateRestaurantSeatAvailableTodaySuccess:
      '本日空席あり設定を更新できました！',

    /* Edit Restaurant */
    editRestaurant: {
      /* Restaurant Payment */

      /* Restaurant Information */
      fetchRestaurantInformationFailed: '店舗情報を取得できませんでした！',
      fetchRestaurantInformationSuccess: '店舗情報を取得できました！',
      updateRestaurantInformationFailed: '店舗情報を更新できませんでした！',
      updateRestaurantInformationSuccess: '店舗情報を更新できました！',
      deleteRestaurantPhotoFailed: '店舗画像を削除できませんでした！',
      deleteRestaurantPhotoSuccess: '店舗画像を削除できました！',

      /* Restaurant Photo */
      uploadRestaurantPhotoFailed: '店舗画像をアップロードできませんでした！',
      uploadRestaurantPhotoSuccess: '店舗画像をアップロードできました！',

      /* Restaurant Menu */
      uploadRestaurantMenuPhotoFailed:
        'メニュー画像をアップロードできませんでした！',
      uploadRestaurantMenuPhotoSuccess:
        'メニュー画像をアップロードできました！',
      fetchRestaurantMenuPhotoFailed: 'メニュー情報を取得できませんでした！',
      fetchRestaurantMenuPhotoSuccess: 'メニュー情報を取得できました！',
      deleteRestaurantMenuPhotoFailed: 'メニュー画像を削除できませんでした！',
      deleteRestaurantMenuPhotoSuccess: 'メニュー画像を削除できました！',

      createRestaurantMenuCategoryFailed:
        'メニューカテゴリーを作成できませんでした！',
      createRestaurantMenuCategorySuccess:
        'メニューカテゴリーを作成できました！',
      updateRestaurantMenuCategoryFailed:
        'メニューカテゴリーを更新できませんでした！',
      updateRestaurantMenuCategorySuccess:
        'メニューカテゴリーを更新できました！',
      deleteRestaurantMenuCategoryFailed:
        'メニューカテゴリーを削除できませんでした！',
      deleteRestaurantMenuCategorySuccess:
        'メニューカテゴリーを削除できました！',
      apiUpdateCategoryTaxSuccess:
        'ご指定のカテゴリーの税込み・税抜き設定を更新できました！',
      apiUpdateCategoryTaxFailded:
        'ご指定のカテゴリーの税込み・税抜き設定を更新できませんでした！',

      fetchRestaurantMenuFoodFailed: 'フードメニューを取得できませんでした！',
      fetchRestaurantMenuFoodSuccess: 'フードメニューを取得できました！',
      fetchRestaurantMenuDrinkFailed:
        'ドリンクメニューを取得できませんでした！',
      fetchRestaurantMenuDrinkSuccess: 'ドリンクメニューを取得できました！',

      createRestaurantMenuItemFailed:
        'メニューアイテムを作成できませんでした！',
      createRestaurantMenuItemSuccess: 'メニューアイテムを作成できました！',
      updateRestaurantMenuItemFailed:
        'メニューアイテムを更新できませんでした！',
      updateRestaurantMenuItemSuccess: 'メニューアイテムを更新できました！',
      deleteRestaurantMenuItemFailed:
        'メニューアイテムを削除できませんでした！',
      deleteRestaurantMenuItemSuccess: 'メニューアイテムを削除できました！',

      /* Restaurant Staff */
      fetchRestaurantStaffFailed: 'スタッフ情報を取得できませんでした！',
      fetchRestaurantStaffSuccess: 'スタッフ情報を取得できました！',
      createRestaurantStaffFailed: 'スタッフ情報を作成できませんでした！',
      createRestaurantStaffSuccess: 'スタッフ情報を作成できました！',
      updateRestaurantStaffFailed: 'スタッフ情報を更新できませんでした！',
      updateRestaurantStaffSuccess: 'スタッフ情報を更新できました！',
      deleteRestaurantStaffFailed: 'スタッフ情報を削除できませんでした！',
      deleteRestaurantStaffSuccess: 'スタッフ情報を削除できました！',

      /* Restaurant Review */
      fetchRestaurantReviewFailed: 'レビュー情報を取得できませんでした！',
      fetchRestaurantReviewSuccess: 'レビュー情報を取得できました！',
      deleteRestaurantReviewFailed: 'ご指定のレビューを削除できませんでした！',
      deleteRestaurantReviewSuccess: 'ご指定のレビューを削除できました！',
    },

    /* Edit User */
    editUser: {
      /* User Payment */
      fetchUserPaymentLogFailed: 'ユーザーの課金履歴を取得できませんでした！',
      fetchUserPaymentLogSuccess: 'ユーザーの課金履歴を取得できました！',
      createUserPaymentPeriodSuccess: 'ユーザー支払い期間の成功を作成する',
      createUserPaymentPeriodFailed: 'ユーザーの支払い期間の作成に失敗しました',
      createUserPaymentForeverSuccess: 'ユーザーの支払いを永遠に成功させる',
      createUserPaymentForeverFailed: '永遠に失敗したユーザー支払いの作成',

      /* User Profile */
      fetchUserInformationFailed: 'ユーザー情報を取得できませんでした！',
      fetchUserInformationSuccess: 'ユーザー情報を取得できました！',

      /* User Feeling Today */
    },
  },

  /* Authentication */
  auth: {
    login: 'ログイン',
    logout: 'ログアウト',
    username: 'ユーザー名',
    password: 'パスワード',
    confirmLogout: 'ログアウトしますか？',
  },

  /* Navigation Bar */
  navigation: {
    home: 'ホーム',
    restaurant: '店舗',
    user: 'ユーザー',
    notification: '通知',
    masterdata: 'マスターデータ',
    setting: '設定',
    editRestaurant: {
      title: '店舗編集',
      payment: '課金',
      information: '店舗情報',
      menu: 'メニュー',
      staff: 'スタッフ',
      review: 'レビュー',
      settingSeatAvailable: '本日空席あり設定',
    },
    editUser: {
      title: 'ユーザー編集',
      payment: '課金',
      profile: 'プロフィール',
      feelingToday: '今夜の気分',
      userSetting: 'ユーザー設定',
    },
  },

  /* Home Page */
  home: {
    greeting: 'Hello Admin, how are you today?',
    howToUseCMSAdmin: '各ページの機能のご案内：',
    howToUseRestaurantPage:
      '店舗情報を新規登録・確認・編集・削除できます（編集、または、削除したら取り戻せなくなります）',
    howToUseUserPage:
      'ユーザー情報を確認・編集できます（編集したら取り戻せなくなります）',
    howToUseNotificationPage:
      '管理者からの通知を送信・確認・削除できます（削除したら取り戻せなくなります）',
    howToUseMasterdataPage:
      'マスターデータ情報を追加・確認・削除できます（削除したら取り戻せなくなります）',
    howToUseSettingPage:
      'パスワードを編集できます（編集したら取り戻せなくなります）',
  },

  /* Restaurant Page */
  restaurant: {
    pageTitle: '店舗リスト',

    showLatestCreatedRestaurant: '最新登録した情報を表示する',
    createNewRestaurant: '店舗を新規登録する',
    newUsername: 'ユーザー名',
    newPassword: 'パスワード',
    newRestaurantName: '店名',
    newAddress: '住所',
    newEmail: 'Eメール',
    successToCreateNewRestaurant: '店舗を新規登録できました！',
    goToEditRestaurant: 'この店舗の編集画面へ',

    confirmDeleteRestaurant: 'この店舗を削除しますか？',

    actionHeader: '編集・削除',
    roleHeader: 'ロール',
    nameHeader: '店名',
    addressHeader: '住所',
    phoneHeader: '電話番号',
    emailHeader: 'Eメール',
  },

  /* User Page */
  user: {
    pageTitle: 'ユーザーリスト',
    actionHeader: '詳細',
    nickNameHeader: 'ニックネーム',
    facebookFullNameHeader: 'Facebookのフルネーム',
    createdAtHeader: '作成時間',
    typePaymentRegisterHeader: '支払い台帳',
    endDateHeader: '有効期限',
  },

  /* Notification Page */
  notification: {
    pageTitle: '通知リスト',
    sendBtn: '新規登録',
    actionTabHeader: 'アクション',
    idTableHeader: 'ID',
    messageTableHeader: 'メッセージ',
    linkTableHeader: 'リンク',
    createdAtTableHeader: '作成時間',
    sendTitle: 'すべてのユーザーと店舗へ',
    sendText: '通知メッセージ',
    sendLink: '通知リンク',
    confirmDeleteNotification: '選択した通知を削除しますか？',
  },

  /* Master Data Page */
  masterdata: {
    createMasterdata: '新規追加',
    editMasterdata: '編集',
    confirmDeleteMasterdata: 'このマスターデータを削除しますか？',
    name: '名前',
    category: 'カテゴリー',
    order: '並び順の番号',

    /* Restaurant masterdata label */
    restaurant: {
      OpenTimeSearchLabel: '営業時間（検索用）・店舗情報',
      AloneMenuLabel: '一人呑みメニュー・店舗情報',
      SakeLabel: 'お酒',
      LonelySceneLabel: '一人呑みシーン・店舗情報',
      RestaurantPaymentLabel: '支払い方法・店舗情報',
      SmokingLabel: '禁煙・喫煙・店舗情報',
      LanguagesLabel: '言語・店舗情報',
      FeaturesLabel: '特徴・店舗情報',
      SalesInformationsLabel: '営業情報・店舗情報',
      TypeOfMenuLabel: '料理・店舗情報',
      TheAtmosphereOfTheCounterLabel: 'カウンターの雰囲気・店舗情報',
      LocationLabel: 'ロケーション・店舗情報',

      StaffStyleLabel: '接客スタイル・スタッフ情報',
      StaffCanTalkLabel: '語れます・スタッフ情報',
      StaffBirthplaceLabel: '出身地・スタッフ情報',
    },

    /* User masterdata label */
    user: {
      SinglePersonAreaLabel: '一人呑みエリア・プロフィール情報',
      OccupationLabel: '職業・プロフィール情報',
      SakeLabel: 'お酒・プロフィール情報',
      SmokingLabel: 'タバコ・プロフィール情報',
      StoryStanceLabel: '話のスタンス・プロフィール情報',
      FavoriteConversationGenreLabel: '好きな会話ジャンル・プロフィール情報',
      PersonalLabel: 'パーソナル・プロフィール情報',
      WhenDrinkingAloneLabel: '1人呑み時・プロフィール情報',

      GenderOfPartnerLabel: '呑みたい相手・今夜の気分情報',
      YourFeelingLabel: '希望するノリ・今夜の気分情報',
      PaymentFeelingLabel: 'お支払い・今夜の気分情報',
      TimeFeelingLabel: '何時からあいてる・今夜の気分情報',

      UserBirthplaceLabel: '出身地・プロフィール情報',
    },
  },

  /* Setting Page */
  setting: {
    changePasswordTitle: 'パスワード変更',
    oldPassword: '現在のパスワード',
    newPassword: '新しく設定するパスワード',
    confirmPassword:
      '新しく設定するパスワード（確認のためにもう一度入力してください）',
    saveChangedPasswordBtn: '変更したパスワードを保存する',
  },

  /* Edit Restaurant */
  editRestaurant: {
    /* Payment Page */
    payment: {
      greeting: 'この店舗は',
      changeRole:
        '現状、店舗を無料会員・有料会員の切り替えができていません。2月中に実装する予定です。',
    },

    /* Information Page */
    information: {
      /* FREE restaurant information */
      freeRestaurantInformation: '基本情報',
      restaurantName: '店名',
      email: 'Eメール',
      phoneNumber: '電話番号',
      addressLevelOne: '都道府県',
      addressLevelTwo: '市区町村',
      addressLevelThree: '町名',
      specificAddress: '番地・建物名',
      accessibility: 'アクセス（交通手段）',
      shortDescription: '簡易紹介文（300文字以内）',
      descriptionMaxLength: '300文字以内にご記入ください',
      openingHours: '営業時間',
      openingHoursForSearch: '営業時間（検索用）',
      regularHolidays: '定休日',
      url: 'URL',
      genderRatioMan: '男女比（男性）',
      genderRatioLady: '男女比（女性）',
      ratioMan: '男性',
      ratioLady: '女性',
      vs: '対',
      male: '男性',
      female: '女性',
      customerAgeMin: 'お客様年代・から',
      customerAgeMax: 'お客様年代・まで',
      yearsOld: '歳',
      from: 'から',
      to: 'まで',
      aloneMenu: '一人呑みメニュー',
      typeOfSake: 'お酒の種類',
      moreThansKind: '種類以上',
      budgetPerPersonLow: '一人呑み予算・から',
      budgetPerPersonHigh: '一人呑み予算・まで',
      japaneseYen: '円',
      sake: 'お酒',
      lonelyScene: '一人呑みシーン',

      /* PREMIUM restaurant information */
      premiumRestaurantInformation: 'プレミアム会員店舗情報',
      yomigana: 'よみがな',
      payment: '支払い方法',
      snsFacebook: 'SNS Facebook',
      snsTwitter: 'SNS Twitter',
      snsInstagram: 'SNS Instagram',
      numberOfSeatCounter: '席数（カウンター）',
      numberOfSeatTable: '席数（テーブル）',
      seat: '席',
      counter: 'カウンター',
      table: 'テーブル',
      smoking: '禁煙・喫煙',
      languages: '言語',
      feature: '特徴',
      salesInformation: '営業情報',
      typeOfMenu: '料理',
      theAtmosphereOfTheCounters: 'カウンターの雰囲気',
      remarks: '備考',
      location: 'ロケーション',
      memberRegistrationDate: '会員登録日',
      openDate: 'オープン年月',
      maskDatetime: '####年##月',
      catchphrase: 'キャッチフレーズ（35文字以内）',
      catchphraseMaxLength: '35文字以内にご記入ください',

      uploadPhoto: '画像アップロード',
      confirmDeletePhoto: 'この画像を削除しますか？',
      saveBtn: '店舗情報を保存する',
    },

    /* Menu Page */
    menu: {
      photos: 'メニュー画像',
      listItem: 'メニューリスト',
      photoDescription: '画像の説明',
      uploadPhoto: '画像アップロード',
      confirmDeletePhoto: 'この画像を削除しますか？',

      food: 'フード',
      drink: 'ドリンク',

      actionHeader: 'アクション',
      nameHeader: 'アイテム名',
      priceHeader: '価格',
      createdAtHeader: '作成時間',
      haveNotMenuLabel: '該当するメニューが見つかりません',

      createNewCategory: 'カテゴリー追加',
      editCategory: 'カテゴリー名編集',
      categoryName: 'カテゴリー名',
      confirmDeleteCategory: 'このカテゴリーを削除しますか？',

      addItem: 'アイテム追加',
      taxed: '税込み',
      noTax: '税抜き',
      typeOfTaxedRound: '四捨五入',
      typeOfTaxedRoundDescription: '四捨五入',
      typeOfTaxedFloor: '切り捨て',
      typeOfTaxedFloorDescription: '小数点をそのまま外す',
      typeOfTaxedCeil: '切り上げ',
      typeOfTaxedCeilDescription: '小数点を外して、一つ上の整数に繰り上げる',
      typeOfTaxedManual: '直接入力',
      typeOfTaxedManualDescription:
        'こちらのボタンを押すと、メニューを作成・編集する際に、税込み価格を入力できるようになります。',
      taxedTitle: '価格は全て税込み表示です',
      noTaxedTitle: '価格は全て税抜き表示です',
      createNewMenuItem: 'アイテム追加',
      createNewMenuItemApplyTax:
        'ご指定のカテゴリーの価格は税込価格となっています。',
      createNewMenuItemNoApplyTax:
        'ご指定のカテゴリーの価格は税抜き価格となっています。',
      editMenuItem: 'アイテム編集',
      menuItemName: 'アイテム名',
      menuItemPrice: '価格',
      confirmDeleteMenuItem: 'このアイテムを削除しますか？',
    },

    /* Staff Page */
    staff: {
      createNewStaff: 'スタッフ追加',
      editStaff: 'ステッフ編集',
      confirmDeleteStaff: 'このスタッフ情報を削除しますか？',

      photo: 'スタッフ写真',
      name: '名前',
      birthday: '生年月日',
      birthplace: '出身地',
      maskDate: '####年##月##日',
      title: '肩書',
      style: '接客スタイル',
      profile: 'プロフィール',
      canTalk: '語れます',
    },

    /* Review Page */
    review: {
      pageTitle: 'レビュー',
      actionHeader: '削除',
      nicknameHeader: 'ニックネーム',
      rateHeader: 'レーティング',
      commentHeader: 'コメント',
      updatedAtHeader: '更新時間',
      confirmDeleteRestaurant: 'このレビューを削除しますか？',
    },

    setting: {
      title: '設定',
      seatAvailableTodayTitle: '本日空席あり設定',
      seatAvailableTodayLabel: '本日空席あり',
      seatAvailable: '空席あり',
      seatFull: '満席',
    },
  },

  /* Edit User */
  editUser: {
    /* Payment Page */
    payment: {
      greeting: 'このユーザーは',
      changeRole:
        '現状、ユーザーを無料会員・有料会員の切り替えができていません。2月中に実装する予定です。',
      paymentLogTitle: 'ユーザーの課金履歴',
      descriptionHeader: '課金内容',
      createdAtHeader: '作成時間',
      updatedAtHeader: '更新時間',
    },

    /* Profile Page */
    profile: {
      pageTitle: 'プロフィール',

      secret: '秘密',
      userId: 'ユーザーID',
      nickName: 'ニックネーム',
      facebookFullName: '氏名',
      facebookAvatar: 'アバター',
      facebookEmail: 'Eメール',
      facebookBirthday: '生年月日',
      photos: '写真',
      selfIntroduction: '自己紹介',
      singlePersonArea: '一人呑みエリア',
      occupation: '職業',
      sake: 'お酒',
      smoking: 'タバコ',
      storyStance: '話のスタンス',
      favoriteConversationGenre: '好きな会話ジャンル',
      personal: 'パーソナル',
      whenDrinkingAlone: '1人呑み時',
      residence: '居住地',
      placeOfBirth: '出身地',
      createdAt: '作成時間',
      updatedAt: '更新時間',
      maskDate: '####年##月##日',
      maskDatetime: '####年##月##日 ##時##分##秒',
    },

    /* Feeling Today Page */
    feelingToday: {
      pageTitle: '今夜の気分',

      drinkingArea: '呑みたいエリア',
      todayComment: '今日のコメント',
      ageOfPartner: '呑みたい年齢',
      ageOfPartnerMin: '呑みたい年齢・から',
      ageOfPartnerMax: '呑みたい年齢・まで',
      age: '歳',
      genderOfPartner: '呑みたい相手',
      yourFeeling: '希望するノリ',
      paymentFeeling: 'お支払い',
      timeFeeling: '何時からあいてる',
      updatedAt: '更新時間',
      maskDatetime: '####年##月##日 ##時##分##秒',
    },

    /* User Setting */
    userSetting: {
      pageTitle: 'ユーザー設定',
      startDate: '開始日',
      endDate: '終了日',
      saveBtn: 'ユーザー設定を保存',
      makeForever: '永久にする',
      payPeriod: '有料期間を設定する',
    },
  },
};
