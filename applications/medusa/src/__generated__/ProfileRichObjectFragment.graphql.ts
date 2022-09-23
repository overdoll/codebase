/**
 * @generated SignedSource<<364c1f7753f264fc7ed1a05a5d8838c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileRichObjectFragment$data = {
  readonly username: string;
  readonly " $fragmentType": "ProfileRichObjectFragment";
};
export type ProfileRichObjectFragment$key = {
  readonly " $data"?: ProfileRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileRichObjectFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "dcb3e135489d52f09258333c7b3a96b6";

export default node;
