/**
 * @generated SignedSource<<aaf5f91b15e8acd19e83ed5d9d236e96>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchSeriesFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchSeriesFragment" | "SearchSeriesRichObjectFragment">;
  readonly " $fragmentType": "MetaSearchSeriesFragment";
};
export type MetaSearchSeriesFragment$key = {
  readonly " $data"?: MetaSearchSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchSeriesFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SearchSeriesRichObjectFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchSeriesFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "fc5b7c12c74183349911f745fe6ac75e";

export default node;
