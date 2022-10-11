/**
 * @generated SignedSource<<3902159b168b896ef164775f82d42c19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSupportClubViewerFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "ContainerSupportClubViewerFragment";
};
export type ContainerSupportClubViewerFragment$key = {
  readonly " $data"?: ContainerSupportClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSupportClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSupportClubViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ba11db245591b28faf750b840871f1e2";

export default node;
