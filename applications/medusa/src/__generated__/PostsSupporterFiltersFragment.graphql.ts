/**
 * @generated SignedSource<<dfacb5f26bb9e520419a6b8c0ab37650>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsSupporterFiltersFragment$data = {
  readonly hasClubSupporterSubscription: boolean;
  readonly isStaff: boolean;
  readonly " $fragmentType": "PostsSupporterFiltersFragment";
};
export type PostsSupporterFiltersFragment$key = {
  readonly " $data"?: PostsSupporterFiltersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsSupporterFiltersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsSupporterFiltersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasClubSupporterSubscription",
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

(node as any).hash = "caced568803996a1f341ffba03564522";

export default node;
