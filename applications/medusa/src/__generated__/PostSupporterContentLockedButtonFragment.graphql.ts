/**
 * @generated SignedSource<<2053daaf6f51466ed14aea6d9bd37857>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPostConditionWrapperFragment" | "ClubSupporterSubscriptionPriceButtonFragment">;
  readonly " $fragmentType": "PostSupporterContentLockedButtonFragment";
};
export type PostSupporterContentLockedButtonFragment$key = {
  readonly " $data"?: PostSupporterContentLockedButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentLockedButtonFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportPostConditionWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupporterSubscriptionPriceButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "074133d163f63f063a5b0346af84781f";

export default node;
