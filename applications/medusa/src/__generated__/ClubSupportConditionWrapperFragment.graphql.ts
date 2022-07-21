/**
 * @generated SignedSource<<2bab451d3391e20b67b890ee0ddfed28>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubGuestJoinWrapperFragment" | "ClubGuestSupportWrapperFragment" | "ClubRedirectSupportWrapperFragment" | "ClubSupportWrapperFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubRedirectSupportWrapperFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "8512fb4718a2797ceef1a3f0754b4a7b";

export default node;
