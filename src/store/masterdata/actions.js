import { ALL_PROVINCE } from '../../graphql/queries/getAllProvince';
import { CHILD_POSTAL_CODE } from '../../graphql/queries/getChildPostalCode';
import { RESTAURANT_ALL_MASTER } from '../../graphql/queries/getAllMasterRestaurant';
import { CREATE_MASTER_RESTAURANT } from '../../graphql/mutations/createMasterRestaurant';
import { UPDATE_MASTER_RESTAURANT } from '../../graphql/mutations/updateMasterRestaurant';
import { DELETE_MASTER_RESTAURANT } from '../../graphql/mutations/deleteMasterRestaurant';
import { USER_ALL_MASTER } from '../../graphql/queries/getAllMasterUser';
import { CREATE_MASTER_USER } from '../../graphql/mutations/createMasterUser';
import { UPDATE_MASTER_USER } from '../../graphql/mutations/updateMasterUser';
import { DELETE_MASTER_USER } from '../../graphql/mutations/deleteMasterUser';

/**
 * @description call API Fetch Restaurant Master Data
 * @author AnhTQ
 * @date 2019-12-31
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchRestaurantMasterdataAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: RESTAURANT_ALL_MASTER,
      variables: {
        input,
      },
    });

    // Fetch Master Data Success
    if (response.data.result.error.requestResolved) {
      commit('saveRestaurantMasterdataMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Master Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Create Restaurant Master Data
 * @author AnhTQ
 * @date 2020-01-11
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateRestaurantMasterdataAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: CREATE_MASTER_RESTAURANT,
      variables: {
        input,
      },
    });

    // Create Restaurant Master Data Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Create Restaurant Master Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete Restaurant Master Data
 * @author AnhTQ
 * @date 2020-01-11
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantMasterdataAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_MASTER_RESTAURANT,
      variables: {
        input,
      },
    });

    // Delete Restaurant Master Data Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Delete Restaurant Master Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Fetch User Master Data
 * @author AnhTQ
 * @date 2019-12-31
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchUserMasterdataAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: USER_ALL_MASTER,
      variables: {
        input,
      },
    });

    // Fetch Master Data Success
    if (response.data.result.error.requestResolved) {
      commit('saveUserMasterdataMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Master Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Create User Master Data
 * @author AnhTQ
 * @date 2020-01-11
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateUserMasterdataAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: CREATE_MASTER_USER,
      variables: {
        input,
      },
    });

    // Create User Master Data Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Create User Master Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete User Master Data
 * @author AnhTQ
 * @date 2020-01-11
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteUserMasterdataAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_MASTER_USER,
      variables: {
        input,
      },
    });

    // Delete User Master Data Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Delete User Master Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API fetch all Japan's province
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient }
 * @returns
 */
export async function apiFetchAllProvinceAction({ commit }, { apolloClient }) {
  try {
    const response = await apolloClient.query({
      query: ALL_PROVINCE,
    });

    // Fetch Province Success
    if (response.data.result.error === null) {
      commit('saveAddressLevelOneMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Province Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API fetch all Japan's child province
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, level }
 * @returns
 */
export async function apiFetchChildProvinceAction(
  { commit },
  { apolloClient, input, addressLevel }
) {
  try {
    const response = await apolloClient.query({
      query: CHILD_POSTAL_CODE,
      variables: { input },
    });

    // Fetch Child Province Success
    if (response.data.result.error === null) {
      switch (addressLevel) {
        case 'Two':
          commit('saveAddressLevelTwoMutation', { response });
          break;
        case 'Three':
          commit('saveAddressLevelThreeMutation', { response });
          break;
      }

      return { requestResolved: true };
    }
    // Fetch Child Province Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}


/**
 * @description Call API update Restaurant Master Data
 * @author TungPT
 * @date 2020-03-06
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiEditRestaurantMasterdataAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: UPDATE_MASTER_RESTAURANT,
      variables: { input },
    });

    // Update Master Restaurant Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Master Restaurant Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}


/**
 * @description Call API update User Master Data
 * @author TungPT
 * @date 2020-03-06
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiEditUserMasterdataAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: UPDATE_MASTER_USER,
      variables: { input },
    });

    // Update Master User Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Master User Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
