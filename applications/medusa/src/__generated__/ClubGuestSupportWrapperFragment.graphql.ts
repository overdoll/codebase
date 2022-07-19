/**
 * @generated SignedSource<<e0db5e6a7e873ce203370a8d5e8be743>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubGuestSupportWrapperFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubGuestSupportWrapperFragment";
};
export type ClubGuestSupportWrapperFragment$key = {
  readonly " $data"?: ClubGuestSupportWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubGuestSupportWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubGuestSupportWrapperFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ed20a01aba9bc9a31821962a1e0a4bbd";

export default node;
