/**
 * @generated SignedSource<<e49ee16f99f221161f600e50375bd16e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCategoryTopicFragment$data = {
  readonly topic: {
    readonly title: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryTopicFormFragment">;
  readonly " $fragmentType": "ChangeCategoryTopicFragment";
};
export type ChangeCategoryTopicFragment$key = {
  readonly " $data"?: ChangeCategoryTopicFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryTopicFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCategoryTopicFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Topic",
      "kind": "LinkedField",
      "name": "topic",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeCategoryTopicFormFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "954fb946d3d122612185075cb98d6138";

export default node;
