/**
 * @generated SignedSource<<c54376f9f80b8efd7d0caefcb9c18d7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubGuestJoinWrapperFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubGuestJoinWrapperFragment";
};
export type ClubGuestJoinWrapperFragment$key = {
  readonly " $data"?: ClubGuestJoinWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubGuestJoinWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubGuestJoinWrapperFragment",
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

(node as any).hash = "fdbfbe152debb0ed0a66f12db35e4445";

export default node;
