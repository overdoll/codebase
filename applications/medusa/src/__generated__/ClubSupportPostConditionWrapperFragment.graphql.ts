/**
 * @generated SignedSource<<d8f75ff8ea98ddf0064cf19a7a1a357e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportPostConditionWrapperFragment$data = {
  readonly viewerIsOwner: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ClubGuestJoinWrapperFragment" | "ClubGuestSupportWrapperFragment" | "ClubRedirectSupportWrapperFragment">;
  readonly " $fragmentType": "ClubSupportPostConditionWrapperFragment";
};
export type ClubSupportPostConditionWrapperFragment$key = {
  readonly " $data"?: ClubSupportPostConditionWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPostConditionWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportPostConditionWrapperFragment",
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
      "name": "ClubRedirectSupportWrapperFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "009c81db38a4615ac7a68cd7964aafc6";

export default node;
