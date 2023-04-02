import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN'
}

export enum AppResources {
    USERS = 'USERS',
    POSTS = 'POSTS',
    TEST = 'TEST',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
    // Author roles
    .grant(AppRoles.AUTHOR)
    .updateOwn([AppResources.USERS])
    .deleteOwn([AppResources.USERS])
    .createOwn([AppResources.POSTS])
    .updateOwn([AppResources.POSTS])
    .deleteOwn([AppResources.POSTS])
    .readOwn([AppResources.USERS])
    .readOwn([AppResources.POSTS])
    // Admin roles
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .createAny([AppResources.USERS])
    .updateAny([AppResources.POSTS, AppResources.USERS])
    .deleteAny([AppResources.POSTS, AppResources.USERS])
    .readAny([AppResources.POSTS, AppResources.USERS, AppResources.TEST])