import { ADMIN_MENU_RESTAURANT } from '../../../graphql/queries/adminMenuRestaurant';
import { ADMIN_ADD_PHOTO_MENU } from '../../../graphql/mutations/adminAddPhotoMenuRestaurant';
import { ADMIN_UPDATE_PHOTO_MENU } from '../../../graphql/mutations/adminUpdatePhotoMenuRestaurant';
import { ADMIN_DELETE_PHOTO_MENU } from '../../../graphql/mutations/adminDeletePhotoMenuRestaurant';
import { ADMIN_CREATE_MENU_CATEGORY } from '../../../graphql/mutations/adminCreateMenuCategoryRestaurant';
import { ADMIN_UPDATE_MENU_CATEGORY } from '../../../graphql/mutations/adminUpdateMenuCategoryRestaurant';
import { ADMIN_DELETE_MENU_CATEGORY } from '../../../graphql/mutations/adminDeleteMenuCategoryRestaurant';
import { ADMIN_CREATE_MENU } from '../../../graphql/mutations/adminCreateMenuRestaurant';
import { ADMIN_UPDATE_MENU } from '../../../graphql/mutations/adminUpdateMenuRestaurant';
import { ADMIN_DELETE_MENU } from '../../../graphql/mutations/adminDeleteMenuRestaurant';
import { ADMIN_UPDATE_CATEGORY_TAX } from '../../../graphql/mutations/adminUpdateCategoryTaxRestaurant';

/**
 * @description call API Fetch Restaurant Menu Photo
 * @author AnhTQ
 * @date 2020-01-02
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchRestaurantMenuPhotoAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_MENU_RESTAURANT,
      variables: { input },
    });

    // Fetch Menu Photo Success
    if (response.data.result.error === null) {
      commit('saveMenuPhotoMutation', { response, photoIndex: 'saveAllPhoto' });
      return { requestResolved: true };
    }
    // Fetch Menu Photo Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Fetch Restaurant Menu Item
 * @author AnhTQ
 * @date 2020-01-02
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchRestaurantMenuItemAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_MENU_RESTAURANT,
      variables: { input },
    });

    // Fetch Menu Item Success
    if (response.data.result.error === null) {
      commit('saveMenuItemMutation', { response, input });
      return { requestResolved: true };
    }
    // Fetch Menu Item Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Upload Restaurant Menu Photo - Add or Update
 * @author AnhTQ
 * @date 2020-01-03
 * @export
 * @param {*} { commit }
 * @param {boolean} { apolloClient, input, photo, photoIndex, isAddNew }
 * @returns
 */
export async function apiUploadRestaurantMenuPhotoAction(
  { commit },
  { apolloClient, input, photo, photoIndex, isAddNew }
) {
  try {
    const mutation = isAddNew ? ADMIN_ADD_PHOTO_MENU : ADMIN_UPDATE_PHOTO_MENU;
    const response = await apolloClient.mutate({
      mutation,
      variables: { input, photo },
    });

    // Upload Menu Photo Success
    if (response.data.result.error.requestResolved) {
      commit('saveMenuPhotoMutation', { response, photoIndex });
      return { requestResolved: true };
    }
    // Upload Menu Photo Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete Restaurant Menu Photo
 * @author AnhTQ
 * @date 2020-01-04
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, photoIndex }
 * @returns
 */
export async function apiDeleteRestaurantMenuPhotoAction(
  { commit },
  { apolloClient, input, photoIndex }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_DELETE_PHOTO_MENU,
      variables: { input },
    });

    // Delete Photo Success
    if (response.data.result.requestResolved) {
      commit('deleteMenuPhotoMutation', { photoIndex });

      return { requestResolved: true };
    }
    // Delete Photo Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Create Restaurant Menu Category
 * @author AnhTQ
 * @date 2020-01-05
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateRestaurantMenuCategoryAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_CREATE_MENU_CATEGORY,
      variables: { input },
    });

    // Create Menu Category Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Create Menu Category Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant Menu Category
 * @author AnhTQ
 * @date 2020-01-05
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateRestaurantMenuCategoryAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_MENU_CATEGORY,
      variables: { input },
    });

    // Update Menu Category Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Menu Category Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete Restaurant Menu Category
 * @author AnhTQ
 * @date 2020-01-05
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantMenuCategoryAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_DELETE_MENU_CATEGORY,
      variables: { input },
    });

    // Delete Menu Category Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Delete Menu Category Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Create Restaurant Menu Item
 * @author AnhTQ
 * @date 2020-01-05
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateRestaurantMenuItemAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_CREATE_MENU,
      variables: { input },
    });

    // Create Menu Item Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Create Menu Item Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant Menu Item
 * @author AnhTQ, NamTS
 * @date 2020-02-17
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, menuTypes }
 * @returns 
 */
export async function apiUpdateRestaurantMenuItemAction(
  { commit },
  { apolloClient, input, menuTypes }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_MENU,
      variables: { input },
    });

    // Update Menu Item Success
    if (response.data.result.requestResolved) {
      commit('updateMenuItemMutation', { input, menuTypes });
      return { requestResolved: true };
    }
    // Update Menu Item Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete Restaurant Menu Item
 * @author AnhTQ
 * @date 2020-01-05
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantMenuItemAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_DELETE_MENU,
      variables: { input },
    });

    // Delete Menu Item Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Delete Menu Item Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant Category Tax
 * @author NamTS
 * @date 2020-02-15
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateCategoryTaxAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_CATEGORY_TAX,
      variables: { input },
    });

    // Delete Menu Item Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Delete Menu Item Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
