/**
 * @generated SignedSource<<77690aacc5c99e3a7e4f92caefd0a252>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinWrapperFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ClubJoinWrapperFragment";
};
export type ClubJoinWrapperFragment$key = {
  readonly " $data"?: ClubJoinWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinWrapperFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "613e238fc97a39c4a8227823d9886c6c";

export default node;
