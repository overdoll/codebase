/**
 * @generated SignedSource<<a99b896a761844f93b9861b76a64d14c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BoxesHomeFragment$data = {
  readonly hasClubSupporterSubscription: boolean;
  readonly " $fragmentType": "BoxesHomeFragment";
};
export type BoxesHomeFragment$key = {
  readonly " $data"?: BoxesHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BoxesHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BoxesHomeFragment",
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

(node as any).hash = "1cdeea4deb334b77b8beeb7da117d983";

export default node;
