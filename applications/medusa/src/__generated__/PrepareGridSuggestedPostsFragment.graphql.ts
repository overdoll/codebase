/**
 * @generated SignedSource<<009548cd9916bd2b845aeb6d12d06195>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareGridSuggestedPostsFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "PrepareGridSuggestedPostsFragment";
};
export type PrepareGridSuggestedPostsFragment$key = {
  readonly " $data"?: PrepareGridSuggestedPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrepareGridSuggestedPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrepareGridSuggestedPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "5c7e47481ba23110b7067cc96c039d14";

export default node;
