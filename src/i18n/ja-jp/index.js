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
  onlyForPremiumRestaurant: 'プレミアム会員にアップグレードしてください！',

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
    fetchUserListFailed: 'ユーザリストを取得できませんでした！',
    fetchUserListSuccess: 'ユーザリストを取得できました！',

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
    deleteRestaurantMasterdataFailed:
      '店舗向けの入力項目の選択肢を削除できませんでした！',
    deleteRestaurantMasterdataSuccess:
      '店舗向けの入力項目の選択肢を削除できました！',
    /* for User */
    fetchUserMasterdataFailed:
      'ユーザ向けの入力項目の選択肢を取得できませんでした！',
    fetchUserMasterdataSuccess:
      'ユーザ向けの入力項目の選択肢を取得できました！',
    createUserMasterdataFailed:
      'ユーザ向けの入力項目の選択肢を登録できませんでした！',
    createUserMasterdataSuccess:
      'ユーザ向けの入力項目の選択肢を登録できました！',
    deleteUserMasterdataFailed:
      'ユーザ向けの入力項目の選択肢を削除できませんでした！',
    deleteUserMasterdataSuccess:
      'ユーザ向けの入力項目の選択肢を削除できました！',
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
      fetchRestaurantReviewFailed: '口コミ情報を取得できませんでした！',
      fetchRestaurantReviewSuccess: '口コミ情報を取得できました！',
    },

    /* Edit User */
    editUser: {
      /* User Payment */
      /* User Profile */
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
      review: '口コミ',
    },
    editUser: {
      title: 'ユーザー編集',
      payment: '課金',
      profile: 'プロフィール',
      feelingToday: '今夜の気分',
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
    actionHeader: '編集',
    nickNameHeader: 'ニックネーム',
    facebookFullNameHeader: 'Facebookのフルネーム',
    createdAtHeader: '作成時間',
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
    confirmDeleteMasterdata: 'このマスターデータを削除しますか？',
    name: '名前',
    category: 'カテゴリー',

    /* Restaurant masterdata label */
    restaurant: {
      OpenTimeSearchLabel: '営業時間（検索用）・店舗情報',
      AloneMenuLabel: '一人呑みメニュー・店舗情報',
      SakeLabel: 'お酒',
      LonelySceneLabel: '一人呑みシーン・店舗情報',
      RestaurantPaymentLabel: '支払い方法・店舗情報',
      SmokingLabel: '禁煙・喫煙・店舗情報',
      LanguagesLabel: '言葉・店舗情報',
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
      greeting: 'This restaurant is',
      changeRole: "Can not change restaurant's role yet.",
    },

    /* Information Page */
    information: {
      /* FREE restaurant information */
      freeRestaurantInformation: 'FREE Restaurant Information',
      restaurantName: 'Restaurant Name',
      email: 'Email',
      phoneNumber: 'Phone Number',
      addressLevelOne: 'Address Level One',
      addressLevelTwo: 'Address Level Two',
      addressLevelThree: 'Address Level Three',
      specificAddress: 'Specific Address',
      accessibility: 'Accessibility (transport)',
      shortDescription: 'Short Description',
      openingHours: 'Opening Hours',
      openingHoursForSearch: 'Opening Hours (for Search)',
      regularHolidays: 'Regular Holidays',
      url: 'URL',
      genderRatioMan: 'Gender Ratio (Male)',
      genderRatioLady: 'Gender Ratio (Female)',
      ratioMan: 'Male',
      ratioLady: 'Female',
      vs: 'vs',
      male: 'Male',
      female: 'Female',
      customerAgeMin: 'Customer Age Min',
      customerAgeMax: 'Customer Age Max',
      yearsOld: 'years old',
      from: 'From',
      to: 'To',
      aloneMenu: 'Alone Menu',
      typeOfSake: 'Type of Sake',
      moreThansKind: 'more thans kind',
      budgetPerPersonLow: 'Budget per Person Low',
      budgetPerPersonHigh: 'Budget per Person High',
      japaneseYen: 'JPY',
      sake: 'Sake',
      lonelyScene: 'Lonely Scene',

      /* PREMIUM restaurant information */
      onlyForPremiumUser: 'Only PREMIUM RESTAURANT can use this feature!',
      premiumRestaurantInformation: 'PREMIUM Restaurant Information',
      yomigana: 'Yomigana',
      payment: 'Payment',
      snsFacebook: 'SNS Facebook',
      snsTwitter: 'SNS Twitter',
      snsInstagram: 'SNS Instagram',
      numberOfSeatCounter: 'Number of Seat (Counter)',
      numberOfSeatTable: 'Number of Seat (Table)',
      seat: 'seat',
      counter: 'Counter',
      table: 'Table',
      smoking: 'Smoking',
      languages: 'Languages',
      feature: 'Feature',
      salesInformation: 'Sales Information',
      typeOfMenu: 'Type of Menu',
      theAtmosphereOfTheCounters: 'The Atmosphere of The Counters',
      remarks: 'Remarks',
      location: 'Location',
      memberRegistrationDate: 'Member Registration Date',
      openDate: 'Open Date',
      maskDatetime: '####/##',
      catchphrase: 'Catchphrase',

      uploadPhoto: 'Upload Photo',
      confirmDeletePhoto: 'Are you sure you want to delete this photo?',
      saveBtn: 'Save Restaurant Information',
    },

    /* Menu Page */
    menu: {
      photos: 'Menu photo',
      listItem: 'List item',
      photoDescription: 'Photo description',
      uploadPhoto: 'Upload Photo',
      confirmDeletePhoto: 'Are you sure you want to delete this photo?',

      food: 'Food',
      drink: 'Drink',

      actionHeader: 'Actions',
      nameHeader: 'Item Name',
      priceHeader: 'Price',
      createdAtHeader: 'Created At',

      createNewCategory: 'Create new category',
      editCategory: 'Edit category',
      categoryName: 'Category Name',
      confirmDeleteCategory: 'Are you sure you want to delete this category?',

      addItem: 'Add Item',
      createNewMenuItem: 'Create new menu item',
      editMenuItem: 'Edit menu item',
      menuItemName: 'Menu Item Name',
      menuItemPrice: 'Menu Item Price',
      confirmDeleteMenuItem: 'Are you sure you want to delete this menu item?',
    },

    /* Staff Page */
    staff: {
      createNewStaff: 'Create New Staff',
      editStaff: 'Edit Staff',
      confirmDeleteStaff: 'Are you sure you want to delete this staff?',

      photo: 'Staff Photo',
      name: 'Name',
      birthday: 'Birthday',
      birthplace: 'Birthplace',
      maskDate: '####/##/##',
      title: 'Title',
      style: 'Style',
      profile: 'Profile',
      canTalk: 'Can Talk',
    },

    /* Review Page */
    review: {
      pageTitle: 'Review',
      nicknameHeader: 'Nickname',
      rateHeader: 'Rate',
      commentHeader: 'Comment',
      updatedAtHeader: 'Updated At',
    },
  },

  /* Edit User */
  editUser: {
    /* Profile Page */
    information: {},

    /* Payment Page */
    payment: {},

    /* Feeling Today Page */
    feelingToday: {},
  },
};
