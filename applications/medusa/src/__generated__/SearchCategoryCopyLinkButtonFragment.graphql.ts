/**
 * @generated SignedSource<<9db7ace48cd0473c088d6e2d690653d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCategoryCopyLinkButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "SearchCategoryCopyLinkButtonFragment";
};
export type SearchCategoryCopyLinkButtonFragment$key = {
  readonly " $data"?: SearchCategoryCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCategoryCopyLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCategoryCopyLinkButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "8345ed4aef2055a042febaed280220e7";

export default node;
