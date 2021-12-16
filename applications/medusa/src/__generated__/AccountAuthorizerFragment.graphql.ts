/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsFragment.graphql.js
'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type QueueSettingsFragment$ref: FragmentReference;
declare export opaque type QueueSettingsFragment$fragmentType: QueueSettingsFragment$ref;
export type QueueSettingsFragment = {|
  +id: string,
  +moderatorSettings: {|
    +isInModeratorQueue: boolean
  |},
  +$refType: QueueSettingsFragment$ref,
|};
export type QueueSettingsFragment$data = QueueSettingsFragment;
export type QueueSettingsFragment$key = {
  +$data?: QueueSettingsFragment$data,
  +$fragmentRefs: QueueSettingsFragment$ref,
  ...
=======
import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountAuthorizerFragment = {
    readonly lock: {
        readonly __typename: string;
    } | null;
    readonly isModerator: boolean;
    readonly isStaff: boolean;
    readonly " $refType": "AccountAuthorizerFragment";
};
export type AccountAuthorizerFragment$data = AccountAuthorizerFragment;
export type AccountAuthorizerFragment$key = {
    readonly " $data"?: AccountAuthorizerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AccountAuthorizerFragment">;
>>>>>>> master:applications/medusa/src/__generated__/AccountAuthorizerFragment.graphql.ts
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountAuthorizerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsFragment.graphql.js
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ModeratorSettings",
      "kind": "LinkedField",
      "name": "moderatorSettings",
=======
      "concreteType": "AccountLock",
      "kind": "LinkedField",
      "name": "lock",
>>>>>>> master:applications/medusa/src/__generated__/AccountAuthorizerFragment.graphql.ts
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsFragment.graphql.js
          "name": "isInModeratorQueue",
=======
          "name": "__typename",
>>>>>>> master:applications/medusa/src/__generated__/AccountAuthorizerFragment.graphql.ts
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isModerator",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isStaff",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
<<<<<<< HEAD:applications/medusa/src/__generated__/QueueSettingsFragment.graphql.js
// prettier-ignore
(node: any).hash = 'd3c67b9890964a2024059300c14fb725';
module.exports = node;
=======
(node as any).hash = 'ca7c8a6fbbaee601868f43208836444a';
export default node;
>>>>>>> master:applications/medusa/src/__generated__/AccountAuthorizerFragment.graphql.ts
