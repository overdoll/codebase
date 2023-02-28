/**
 * @generated SignedSource<<d832a16637cd113def1bc5b3f3abfc70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SecondaryBoxesHomeFragment$data = {
  readonly hasClubSupporterSubscription: boolean;
  readonly " $fragmentType": "SecondaryBoxesHomeFragment";
};
export type SecondaryBoxesHomeFragment$key = {
  readonly " $data"?: SecondaryBoxesHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SecondaryBoxesHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SecondaryBoxesHomeFragment",
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

(node as any).hash = "109120815f25e5798072f3e907f57787";

export default node;
