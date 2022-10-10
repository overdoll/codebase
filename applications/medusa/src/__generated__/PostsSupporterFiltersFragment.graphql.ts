/**
 * @generated SignedSource<<ec56dc6991d866c6e2b05ed3c4be90f9>>
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "f5f4fd9f25705b7aef3abc787f92504b";

export default node;
