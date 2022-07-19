/**
 * @generated SignedSource<<602c6e27b33f263a3d2f415ca58da5fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportConditionWrapperFragment$data = {
  readonly viewerIsOwner: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ClubGuestJoinWrapperFragment" | "ClubGuestSupportWrapperFragment" | "ClubSupportWrapperFragment">;
  readonly " $fragmentType": "ClubSupportConditionWrapperFragment";
};
export type ClubSupportConditionWrapperFragment$key = {
  readonly " $data"?: ClubSupportConditionWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportConditionWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportConditionWrapperFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubGuestJoinWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubGuestSupportWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportWrapperFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "11214aa2bb95672dc2cdb56374f4dee7";

export default node;
