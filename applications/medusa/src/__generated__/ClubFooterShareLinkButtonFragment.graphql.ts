/**
 * @generated SignedSource<<9d0e197a88797ba0174934e59d60fad0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubFooterShareLinkButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubFooterShareLinkButtonFragment";
};
export type ClubFooterShareLinkButtonFragment$key = {
  readonly " $data"?: ClubFooterShareLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterShareLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFooterShareLinkButtonFragment",
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

(node as any).hash = "09183926ec3f8f7392957465a4d85776";

export default node;
