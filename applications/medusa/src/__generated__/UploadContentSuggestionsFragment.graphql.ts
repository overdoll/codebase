/**
 * @generated SignedSource<<22c942c40822013f261c7e8048ef8e54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadContentSuggestionsFragment$data = {
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
  }>;
  readonly " $fragmentType": "UploadContentSuggestionsFragment";
};
export type UploadContentSuggestionsFragment$key = {
  readonly " $data"?: UploadContentSuggestionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadContentSuggestionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadContentSuggestionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "944c15d51f3835c05193955c452c9eca";

export default node;
