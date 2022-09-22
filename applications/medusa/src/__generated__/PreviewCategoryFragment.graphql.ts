/**
 * @generated SignedSource<<b9b948c349bff6dc42e4d74a9739520f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewCategoryFragment$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CategorySmallBannerFragment">;
  readonly " $fragmentType": "PreviewCategoryFragment";
};
export type PreviewCategoryFragment$key = {
  readonly " $data"?: PreviewCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewCategoryFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategorySmallBannerFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "b7358178d719bd49fd6f3b9450f9004f";

export default node;
