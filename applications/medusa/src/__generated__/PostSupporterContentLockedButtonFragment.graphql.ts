/**
 * @generated SignedSource<<df3ca0ea976d1063428ef5cf4364a256>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPostConditionWrapperFragment">;
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ad829283076b4edb2f7cf80fabb3a542";

export default node;
