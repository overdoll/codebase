/**
 * @generated SignedSource<<e3a9fdd57a746453a52ebf57060b8bf9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollSearchCategoryViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ScrollSearchCategoryViewerFragment";
};
export type ScrollSearchCategoryViewerFragment$key = {
  readonly " $data"?: ScrollSearchCategoryViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCategoryViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollSearchCategoryViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "92f4a797ef936a7e09765a5d4d6ced77";

export default node;
