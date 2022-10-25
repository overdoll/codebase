/**
 * @generated SignedSource<<4664b8620c573870d07479639a951418>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubShareLinkButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubShareLinkButtonFragment";
};
export type ClubShareLinkButtonFragment$key = {
  readonly " $data"?: ClubShareLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubShareLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubShareLinkButtonFragment",
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

(node as any).hash = "49b73ec49fcc14250f149164d85e1d06";

export default node;
