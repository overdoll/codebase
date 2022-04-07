/**
 * @generated SignedSource<<fc9496b815d5bcf176c549fc6c29bcb7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubExclusiveContentSuspensionNoticeFragment$data = {
  readonly suspension: {
    readonly expires: any;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubExclusivePostsFragment">;
  readonly " $fragmentType": "ClubExclusiveContentSuspensionNoticeFragment";
};
export type ClubExclusiveContentSuspensionNoticeFragment = ClubExclusiveContentSuspensionNoticeFragment$data;
export type ClubExclusiveContentSuspensionNoticeFragment$key = {
  readonly " $data"?: ClubExclusiveContentSuspensionNoticeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubExclusiveContentSuspensionNoticeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubExclusiveContentSuspensionNoticeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExclusivePostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6fe5cb1af206733613314c84cf509410";

export default node;
