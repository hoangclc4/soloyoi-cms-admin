// This is just an example,
// so you can safely delete all default props below

export default {
  /* Common */
  headerTitle: 'cms admin',
  footerTitle: '© FOODCONNECTION Inc.',
  search: 'Search',
  refresh: 'Refresh',
  send: 'Send',
  upload: 'Upload',
  cancel: 'Cancel',
  confirm: 'Confirm',
  create: 'Create',
  edit: 'Edit',
  update: 'Update',
  delete: 'Delete',
  goBack: 'Go Back',
  error404: 'Sorry, nothing here...',
  freeMember: 'free member',
  premiumMember: 'premium member',
  reviewFieldAgain: 'Please review fields again',
  pleaseSelectAnImageFile: 'Please select an image file!',
  notSupportedFileReaderAPI: 'Not supported File Reader API',
  onlyForPremiumRestaurant: 'Only PREMIUM RESTAURANT can use this feature!',

  /* Call API */
  api: {
    /* Authentication */
    logoutFailed: 'Failed to Logout',
    logoutSuccess: 'Success to Logout',
    loginFailed: 'Username or Password is incorrect',
    loginSuccess: 'Success to Login',

    /* Admin Restaurant */
    fetchRestaurantListFailed: 'Failed to fetch restaurant list!',
    fetchRestaurantListSuccess: 'Success to fetch restaurant list!',
    createRestaurantFailed: 'Failed to create restaurant!',
    createRestaurantSuccess: 'Success to create restaurant!',
    deleteRestaurantFailed: 'Failed to delete restaurant!',
    deleteRestaurantSuccess: 'Success to delete restaurant!',

    /* Admin User */
    fetchUserListFailed: 'Failed to fetch user list!',
    fetchUserListSuccess: 'Success to fetch user list!',

    /* Admin Master Data */
    /* for Restaurant */
    fetchRestaurantMasterdataFailed: 'Failed to fetch Restaurant master data!',
    fetchRestaurantMasterdataSuccess:
      'Success to fetch Restaurant master data!',
    createRestaurantMasterdataFailed: 'Failed to create Restaurant masterdata',
    createRestaurantMasterdataSuccess:
      'Success to create Restaurant masterdata',
    deleteRestaurantMasterdataFailed: 'Failed to delete Restaurant masterdata',
    deleteRestaurantMasterdataSuccess:
      'Success to delete Restaurant masterdata',
    /* for User */
    fetchUserMasterdataFailed: 'Failed to fetch User master data!',
    fetchUserMasterdataSuccess: 'Success to fetch User master data!',
    createUserMasterdataFailed: 'Failed to create User masterdata',
    createUserMasterdataSuccess: 'Success to create User masterdata',
    deleteUserMasterdataFailed: 'Failed to delete User masterdata',
    deleteUserMasterdataSuccess: 'Success to delete User masterdata',
    /* Japan's Province */
    fetchProvinceFailed: 'Failed to fetch Province',
    fetchProvinceSuccess: 'Success to fetch Province',
    fetchChildProvinceFailed: 'Failed to fetch Child Province',
    fetchChildProvinceSuccess: 'Success to fetch Child Province',

    /* Admin Notification */
    fetchAdminNotificationFailed: 'Failed to fetch admin notification',
    fetchAdminNotificationSuccess: 'Success to fetch admin notification',
    createAdminNotificationFailed: 'Failed to create admin notification',
    createAdminNotificationSuccess: 'Success to create admin notification',
    deleteAdminNotificationFailed: 'Failed to delete admin notification',
    deleteAdminNotificationSuccess: 'Success to delete admin notification',

    /* Admin Setting */
    updateAdminPasswordFailed: 'Failed to update password',
    updateAdminPasswordSuccess: 'Success to update password',

    /* Edit Restaurant */
    editRestaurant: {
      /* Restaurant Payment */

      /* Restaurant Information */
      fetchRestaurantInformationFailed: 'Failed to fetch information!',
      fetchRestaurantInformationSuccess: 'Success to fetch information!',
      updateRestaurantInformationFailed:
        'Failed to update restaurant information!',
      updateRestaurantInformationSuccess:
        'Success to update restaurant information!',
      deleteRestaurantPhotoFailed: 'Failed to delete photo!',
      deleteRestaurantPhotoSuccess: 'Success to delete photo!',

      /* Restaurant Photo */
      uploadRestaurantPhotoFailed: 'Failed to upload photo!',
      uploadRestaurantPhotoSuccess: 'Success to upload photo!',

      /* Restaurant Menu */
      uploadRestaurantMenuPhotoFailed: 'Failed to upload photo!',
      uploadRestaurantMenuPhotoSuccess: 'Success to upload photo!',
      fetchRestaurantMenuPhotoFailed: 'Failed to fetch menu!',
      fetchRestaurantMenuPhotoSuccess: 'Success to fetch menu!',
      deleteRestaurantMenuPhotoFailed: 'Failed to delete photo!',
      deleteRestaurantMenuPhotoSuccess: 'Success to delete photo!',

      createRestaurantMenuCategoryFailed:
        'Failed to create restaurant menu category!',
      createRestaurantMenuCategorySuccess:
        'Success to create restaurant menu category!',
      updateRestaurantMenuCategoryFailed:
        'Failed to update restaurant menu category!',
      updateRestaurantMenuCategorySuccess:
        'Success to update restaurant menu category!',
      deleteRestaurantMenuCategoryFailed:
        'Failed to delete restaurant menu category!',
      deleteRestaurantMenuCategorySuccess:
        'Success to delete restaurant menu category!',

      fetchRestaurantMenuFoodFailed: 'Failed to fetch menu food!',
      fetchRestaurantMenuFoodSuccess: 'Success to fetch menu food!',
      fetchRestaurantMenuDrinkFailed: 'Failed to fetch menu drink!',
      fetchRestaurantMenuDrinkSuccess: 'Success to fetch menu drink!',

      createRestaurantMenuItemFailed: 'Failed to create restaurant menu item!',
      createRestaurantMenuItemSuccess:
        'Success to create restaurant menu item!',
      updateRestaurantMenuItemFailed: 'Failed to update restaurant menu item!',
      updateRestaurantMenuItemSuccess:
        'Success to update restaurant menu item!',
      deleteRestaurantMenuItemFailed: 'Failed to delete restaurant menu item!',
      deleteRestaurantMenuItemSuccess:
        'Success to delete restaurant menu item!',

      /* Restaurant Staff */
      fetchRestaurantStaffFailed: 'Failed to fetch staff!',
      fetchRestaurantStaffSuccess: 'Success to fetch staff!',
      createRestaurantStaffFailed: 'Failed to create staff!',
      createRestaurantStaffSuccess: 'Success to create staff!',
      updateRestaurantStaffFailed: 'Failed to update staff!',
      updateRestaurantStaffSuccess: 'Success to update staff!',
      deleteRestaurantStaffFailed: 'Failed to delete staff!',
      deleteRestaurantStaffSuccess: 'Success to delete staff!',

      /* Restaurant Review */
      fetchRestaurantReviewFailed: 'Failed to fetch review!',
      fetchRestaurantReviewSuccess: 'Success to fetch review!',
      deleteRestaurantReviewFailed: 'Failed to delete review!',
      deleteRestaurantReviewSuccess: 'Success to delete review!',
    },

    /* Edit User */
    editUser: {
      /* User Payment */
      fetchUserPaymentLogFailed: 'Failed to fetch user payment log',
      fetchUserPaymentLogSuccess: 'Success to fetch user payment log',

      /* User Profile */
      fetchUserInformationFailed: 'Failed to fetch user information',
      fetchUserInformationSuccess: 'Success to fetch user information',

      /* User Feeling Today */
    },
  },

  /* Authentication */
  auth: {
    login: 'Login',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    confirmLogout: 'Are you sure you want to log out?',
  },

  /* Navigation Bar */
  navigation: {
    home: 'Home',
    restaurant: 'Restaurant',
    user: 'User',
    notification: 'Notification',
    masterdata: 'Masterdata',
    setting: 'Setting',
    editRestaurant: {
      title: 'Edit Restaurant',
      payment: 'Payment',
      information: 'Information',
      menu: 'Menu',
      staff: 'Staff',
      review: 'Review',
    },
    editUser: {
      title: 'Edit User',
      payment: 'Payment',
      profile: 'Profile',
      feelingToday: 'Feeling Today',
    },
  },

  /* Home Page */
  home: {
    greeting: 'Hello Admin, how are you today?',
    howToUseCMSAdmin: 'Basic introduction about features of pages:',
    howToUseRestaurantPage: 'Create/Read/Update/Delete Restaurants',
    howToUseUserPage: 'Read/Update Users',
    howToUseNotificationPage: 'Create/Read/Delete Admin Notifications',
    howToUseMasterdataPage: 'Create/Read/Delete Masterdata',
    howToUseSettingPage: 'Change your password',
  },

  /* Restaurant Page */
  restaurant: {
    pageTitle: 'Restaurant List',

    showLatestCreatedRestaurant: 'Show the latest created',
    createNewRestaurant: 'Create New Restaurant',
    newUsername: 'Username',
    newPassword: 'Password',
    newRestaurantName: 'Restaurant Name',
    newAddress: 'Address',
    newEmail: 'Email',
    successToCreateNewRestaurant: 'Success to create restaurant',
    goToEditRestaurant: 'Go to edit this restaurant',

    confirmDeleteRestaurant: 'Are you sure you want to delete this restaurant?',

    actionHeader: 'Action',
    roleHeader: 'Role',
    nameHeader: 'Restaurant Name',
    addressHeader: 'Address',
    phoneHeader: 'Phone',
    emailHeader: 'Email',
  },

  /* User Page */
  user: {
    pageTitle: 'User List',
    actionHeader: 'action',
    nickNameHeader: 'nickName',
    facebookFullNameHeader: 'Facebook FullName',
    createdAtHeader: 'Created At',
  },

  /* Notification Page */
  notification: {
    pageTitle: 'Notification',
    sendBtn: 'Send New',
    actionTabHeader: 'Action',
    idTableHeader: 'ID',
    messageTableHeader: 'Message',
    linkTableHeader: 'Link',
    createdAtTableHeader: 'Created At',
    sendTitle: 'To all users and restaurant:',
    sendText: 'Notification Message',
    sendLink: 'Notification Link',
    confirmDeleteNotification:
      'Are you sure you want to delete this notification?',
  },

  /* Master Data Page */
  masterdata: {
    createMasterdata: 'Create Masterdata',
    confirmDeleteMasterdata: 'Are you sure you want to delete this masterdata?',
    name: 'Name',
    category: 'Category',

    /* Restaurant masterdata label */
    restaurant: {
      OpenTimeSearchLabel: 'Open Time for Search - Restaurant Info',
      AloneMenuLabel: 'Alone Menu - Restaurant Info',
      SakeLabel: 'Sake - Restaurant Info',
      LonelySceneLabel: 'Lonely Scene - Restaurant Info',
      RestaurantPaymentLabel: 'Restaurant Payment - Restaurant Info',
      SmokingLabel: 'Smoking - Restaurant Info',
      LanguagesLabel: 'Languages - Restaurant Info',
      FeaturesLabel: 'Features - Restaurant Info',
      SalesInformationsLabel: 'Sales Informations - Restaurant Info',
      TypeOfMenuLabel: 'Type of Menu - Restaurant Info',
      TheAtmosphereOfTheCounterLabel:
        'The Atmosphere of the Counter - Restaurant Info',
      LocationLabel: 'Location - Restaurant Info',

      StaffStyleLabel: 'Staff Style - Staff Info',
      StaffCanTalkLabel: 'Staff Can Talk - Staff Info',
      StaffBirthplaceLabel: 'Staff Birth Place - Staff Info',
    },

    /* User masterdata label */
    user: {
      SinglePersonAreaLabel: 'Single Person Area - User Profile',
      OccupationLabel: 'Occupation - User Profile',
      SakeLabel: 'Sake - User Profile',
      SmokingLabel: 'Smoking - User Profile',
      StoryStanceLabel: 'Story Stance - User Profile',
      FavoriteConversationGenreLabel:
        'Favorite Conversation Genre - User Profile',
      PersonalLabel: 'Personal - User Profile',
      WhenDrinkingAloneLabel: 'When Drinking Alone - User Profile',

      GenderOfPartnerLabel: 'Gender of Partner - Feeling Today',
      YourFeelingLabel: 'Your Feeling - Feeling Today',
      PaymentFeelingLabel: 'Payment Feeling - Feeling Today',
      TimeFeelingLabel: 'Time Feeling - Feeling Today',

      UserBirthplaceLabel: 'User Birth Place - User Profile',
    },
  },

  /* Setting Page */
  setting: {
    changePasswordTitle: 'Change Password',
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    saveChangedPasswordBtn: 'Save Changed Password',
  },

  /* Edit Restaurant */
  editRestaurant: {
    /* Payment Page */
    payment: {
      greeting: 'This restaurant is',
      changeRole:
        "Can not change restaurant's role yet. This feature will be applied in February",
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
      actionHeader: 'Action',
      nicknameHeader: 'Nickname',
      rateHeader: 'Rate',
      commentHeader: 'Comment',
      updatedAtHeader: 'Updated At',
      confirmDeleteRestaurant: 'Are you sure you want to delete this review?',
    },
  },

  /* Edit User */
  editUser: {
    /* Payment Page */
    payment: {
      greeting: 'This user is',
      changeRole:
        "Can not change user's role yet. This feature will be applied in February",
      paymentLogTitle: 'User Payment Log',
      descriptionHeader: 'Description',
      createdAtHeader: 'Created At',
      updatedAtHeader: 'Updated At',
    },

    /* Profile Page */
    profile: {
      pageTitle: 'Profile',

      secret: 'secret',
      userId: 'User Id',
      nickName: 'Nickname',
      facebookFullName: 'Facebook Full Name',
      facebookAvatar: 'Facebook Avatar',
      facebookEmail: 'Facebook Email',
      facebookBirthday: 'Facebook Birthday',
      photos: 'Photos',
      selfIntroduction: 'Self Introduction',
      singlePersonArea: 'Single Person Area',
      occupation: 'Occupation',
      sake: 'Sake',
      smoking: 'Smoking',
      storyStance: 'Story Stance',
      favoriteConversationGenre: 'Favorite Conversation Genre',
      personal: 'Personal',
      whenDrinkingAlone: 'When Drinking Alone',
      residence: 'Residence',
      placeOfBirth: 'Place of Birth',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      maskDate: '####/##/##',
      maskDatetime: '####/##/## ##:##:##',
    },

    /* Feeling Today Page */
    feelingToday: {
      title: 'Feeling Today',
      drinkingArea: 'Drinking Area',
      todayComment: 'Today Comment',
      ageOfPartner: 'Age of Partner',
      ageOfPartnerMin: 'Age of Partner Min',
      ageOfPartnerMax: 'Age of Partner Max',
      age: 'Years old',
      genderOfPartner: 'Gender of Partner',
      yourFeeling: 'Your Feeling',
      paymentFeeling: 'Payment Feeling',
      timeFeeling: 'Time Feeling',
      updatedAt: 'Updated At',
      maskDatetime: '####/##/## ##:##:##',
    },
  },
};
