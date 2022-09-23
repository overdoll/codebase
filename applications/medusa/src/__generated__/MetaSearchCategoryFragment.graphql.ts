/**
 * @generated SignedSource<<b59403fb3ff107e6cc139e3c13a94031>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchCategoryFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCategoryFragment" | "SearchCategoryRichObjectFragment">;
  readonly " $fragmentType": "MetaSearchCategoryFragment";
};
export type MetaSearchCategoryFragment$key = {
  readonly " $data"?: MetaSearchCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchCategoryFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchCategoryRichObjectFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchCategoryFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "b9155f32dc08bb6780d4a9d11af48fc6";

export default node;
